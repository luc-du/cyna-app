import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "../../components/utils/errorMessages";
import { processProductData } from "../../components/utils/productUtils";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";
import productService from "../../services/productService";

// ─── Async Thunks ─────────────────────────────────────────────

/**
 * Récupère la liste complète des produits depuis l'API.
 * Si l'appel échoue ou renvoie un tableau vide, on rejette avec un objet fallback.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // On utilise désormais productService.getAllProducts()
      const response = await productService.getAllProducts();
      const data = response.data;

      // Si le backend renvoie un tableau vide ou non-tableau → fallback
      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCK_TOP_PRODUCTS,
          message: undefined,
        });
      }
      return data;
    } catch (error) {
      // En cas d’erreur réseau/serveur → fallback avec message approprié
      const msg = error.response?.data?.message || FALLBACK_API_MESSAGE;
      return rejectWithValue({
        isFallback: true,
        fallback: MOCK_TOP_PRODUCTS,
        message: msg,
      });
    }
  }
);

/**
 * Récupère un produit unique depuis l'API à partir de son productId.
 * Si l'appel échoue, on rejette avec un message d'erreur.
 */
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const id = Number(productId);
      if (isNaN(id)) {
        return rejectWithValue("ID produit invalide");
      }
      // On appelle maintenant productService.getProductById(id)
      const response = await productService.getProductById(id);
      // On garde la transformation processProductData ici
      return processProductData(response.data);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400 || status === 404) {
        return rejectWithValue("Produit introuvable ou requête invalide");
      }
      return rejectWithValue(SEARCH_UNKNOWN_ERROR);
    }
  }
);

/*
 * Recherche de produits par mot-clé.
 * Si l'appel échoue ou ne renvoie pas un tableau, on rejette avec un objet fallback.
 */
export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ keyword = "", page = 0, size = 6 }, { rejectWithValue }) => {
    try {
      // On utilise productService.searchProducts({ … })
      const response = await productService.searchProducts({
        keyword,
        page,
        size,
      });
      const data = response.data;

      // Si pas de données ou format inattendu → fallback
      if (!data || !Array.isArray(data.products)) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCK_TOP_PRODUCTS,
          message: undefined,
        });
      }

      // On transforme ensuite chaque produit
      return data.products.map(processProductData);
    } catch (err) {
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      return rejectWithValue({
        isFallback: true,
        fallback: MOCK_TOP_PRODUCTS,
        message: msg,
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    // Détail d’un produit unique
    item: null,
    loadingItem: false,
    errorItem: null,

    // Liste complète des produits
    list: [],
    loadingList: false,
    errorList: null,

    // Recherche de produits
    searchResults: [],
    loadingSearch: false,
    errorSearch: null,
    isSearchMode: false,

    // Pagination des résultats de recherche
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    // Si vous avez d'autres actions synchrones, vous pouvez les ajouter ici.
  },
  extraReducers: (builder) => {
    // ---------- fetchProducts (liste de produits) ----------
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
        state.list = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
        state.errorList = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingList = false;
        const payload = action.payload || {};

        if (payload.isFallback) {
          state.list = payload.fallback;
          state.errorList = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.list = [];
          state.errorList = payload || SEARCH_UNKNOWN_ERROR;
        }
      });

    // ---------- fetchProductById (détail d’un produit) ----------
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.item = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.item = action.payload;
        state.errorItem = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || SEARCH_UNKNOWN_ERROR;
        state.item = null;
      });

    // ---------- searchProducts (recherche de produits) ----------
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
        state.errorList = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingList = false;
        const payload = action.payload || {};

        if (payload.isFallback) {
          state.list = payload.fallback;
          state.errorList = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.list = [];
          state.errorList = payload || SEARCH_UNKNOWN_ERROR;
        }
      });
  },
});

export default productSlice.reducer;
