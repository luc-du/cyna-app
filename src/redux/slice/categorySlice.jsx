import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_CATEGORIES } from "../../mock/MOCKS_DATA";

// ─── Async Thunks ─────────────────────────────────────────────

/**
 * Récupère toutes les catégories.
 * Fallback MOCK_CATEGORIES en cas d'erreur serveur.
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.CATEGORIES.ALL);
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue(MOCK_CATEGORIES); // Fallback mock si vide
      }

      return data;
    } catch (error) {
      return rejectWithValue(MOCK_CATEGORIES); // Fallback mock si erreur
    }
  }
);

/**
 * Recherche une ou plusieurs catégories.
 * Fallback locale si le backend retourne une liste vide.
 */
export const searchCategories = createAsyncThunk(
  "categories/search",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.CATEGORIES.SEARCH(name));
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0) {
        const fallback = MOCK_CATEGORIES.filter((cat) =>
          cat.name.toLowerCase().includes(name.toLowerCase())
        );
        return fallback;
      }

      return data || MOCK_CATEGORIES;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          "Erreur lors de la recherche de catégories"
      );
    }
  }
);

/**
 * Récupère une catégorie par ID.
 */
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_ROUTES.CATEGORIES.BY_ID(categoryId));
      return res.data;
    } catch (err) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Impossible de récupérer cette catégorie.");
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────

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

      // ─── fetchCategories ─────────────────────────────────────────────
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        // 🎯 Cas du fallback mock : l'erreur contient un tableau de catégories
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.error = "Fallback mock appliqué (serveur vide ou erreur)";
        } else {
          state.list = [];
          state.error =
            action.payload ||
            "Erreur inconnue lors du chargement des catégories";
        }
      })

      // ─── fetchCategoryById ───────────────────────────────────────────
      .addCase(fetchCategoryById.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
        state.selectedCategory = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload || "Erreur lors du chargement.";
        state.selectedCategory = null;
      })

      // ─── searchCategories ───────────────────────────────────────────
      .addCase(searchCategories.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
        state.isSearchMode = true;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
        state.isSearchMode = true;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = [];
        state.errorSearch = action.payload;
        state.isSearchMode = true;
      });
  },
});

export const { clearSearchResults } = categorySlice.actions;
export default categorySlice.reducer;
