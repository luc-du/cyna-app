import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "@services/categoryService"; // <-- on importe le service
import { MOCK_CATEGORIES } from "../../mock/MOCKS_DATA";

/**
 * Récupère toutes les catégories.
 * Fallback MOCK_CATEGORIES en cas d’erreur réseau/serveur ou tableau vide.
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategories();
      const data = response.data;

      // Si le backend renvoie un tableau vide ou non-tableau → fallback
      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCK_CATEGORIES,
          message: undefined,
        });
      }

      return data;
    } catch (err) {
      // En cas d’erreur réseau/serveur → fallback avec message approprié
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      return rejectWithValue({
        isFallback: true,
        fallback: MOCK_CATEGORIES,
        message: msg,
      });
    }
  }
);

/**
 * Recherche une ou plusieurs catégories.
 * Fallback locale si le backend retourne une liste vide ou en cas d’erreur.
 */
export const searchCategories = createAsyncThunk(
  "categories/search",
  async (name, { rejectWithValue }) => {
    try {
      const response = await categoryService.searchCategories(name);
      const data = response.data;

      // Si pas de résultats côté backend → fallback local filtré
      if (!Array.isArray(data) || data.length === 0) {
        const fallback = MOCK_CATEGORIES.filter((cat) =>
          cat.name.toLowerCase().includes(name.toLowerCase())
        );
        return rejectWithValue({
          isFallback: true,
          fallback,
          message: undefined,
        });
      }

      return data;
    } catch (err) {
      // En cas d’erreur réseau/serveur → fallback local filtré avec message
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      const fallback = MOCK_CATEGORIES.filter((cat) =>
        cat.name.toLowerCase().includes(name.toLowerCase())
      );
      return rejectWithValue({
        isFallback: true,
        fallback,
        message: msg,
      });
    }
  }
);

/**
 * Récupère une catégorie par ID.
 * Pas de fallback pour un élément unique, on renvoie juste l’erreur si besoin.
 */
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (categoryId, { getState, rejectWithValue }) => {
    const state = getState().categories; // accès à state.categories
    const fullList = state.list || [];

    // 1. Si la catégorie est déjà dans fullList, on la renvoie direct
    const existInState = fullList.find(
      (cat) => cat.id?.toString() === categoryId
    );
    if (existInState) {
      // On renvoie l’objet existant sans passer par l’API
      return existInState;
    }

    // 2. Sinon, on tente l’appel HTTP
    try {
      const response = await categoryService.getCategoryById(categoryId);
      const data = response.data;
      return data;
    } catch (err) {
      // Si 404 ou autre, on essaie fallback local dans MOCK_CATEGORIES
      const status = err.response?.status;
      if (status === 404 || status === 400) {
        const fallback = MOCK_CATEGORIES.find(
          (cat) => cat.id?.toString() === categoryId
        );
        if (fallback) {
          return fallback;
        } else {
          return rejectWithValue("Catégorie introuvable"); //404
        }
      }
      // Erreur réseau ou autre
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      // On regarde quand même si on a un fallback partiel
      const fallback = MOCK_CATEGORIES.find(
        (cat) => cat.id?.toString() === categoryId
      );
      if (fallback) {
        return fallback;
      }
      return rejectWithValue(msg || SEARCH_UNKNOWN_ERROR);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,

    searchResults: [],
    loadingSearch: false,
    errorSearch: null,
    isSearchMode: false,

    selectedCategory: null,
    loadingSelected: false,
    errorSelected: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.errorSearch = null;
      state.isSearchMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        if (payload?.isFallback) {
          state.list = payload.fallback;
          state.error = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.list = MOCK_CATEGORIES;
          state.error = payload || SEARCH_UNKNOWN_ERROR;
        }
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
        state.selectedCategory = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedCategory = action.payload;
        state.errorSelected = null;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload || SEARCH_UNKNOWN_ERROR;
        state.selectedCategory = null;
      })
      .addCase(searchCategories.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
        state.isSearchMode = true;
        state.searchResults = [];
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
        state.errorSearch = null;
        state.isSearchMode = true;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loadingSearch = false;
        const payload = action.payload;

        if (payload?.isFallback) {
          state.searchResults = payload.fallback;
          state.errorSearch = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.searchResults = [];
          state.errorSearch = payload || SEARCH_UNKNOWN_ERROR;
        }
        state.isSearchMode = true;
      });
  },
});

export const { clearSearchResults } = categorySlice.actions;
export default categorySlice.reducer;
