import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "@services/productService";
import { processProductData } from "../../components/utils/productUtils";
import sortProductsByPriority from "../../components/utils/sortProductByPriority";
import { MOCK_SERVICES, MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts();
      const data = response.data;

      const sortedData = sortProductsByPriority(data);

      return sortedData;
    } catch (error) {
      const msg = error.response?.data?.message || FALLBACK_API_MESSAGE;
      return rejectWithValue({
        isFallback: true,
        fallback: MOCK_TOP_PRODUCTS,
        message: msg,
      });
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { getState, rejectWithValue }) => {
    const state = getState().products;
    const fullList = state.list || [];

    // 1) Vérifier dans le cache (state.list)
    const existInState = fullList.find(
      (p) => String(p.id) === String(productId)
    );
    if (existInState) {
      return processProductData(existInState);
    }

    // 2) Appel à l'API
    try {
      const response = await productService.getProductById(productId);
      const data = response.data;

      // 2a) Si l'API renvoie un 200 OK mais data est null / vide / mal formé
      if (!data || Object.keys(data).length === 0) {
        return rejectWithValue({
          code: "NOT_FOUND_DB",
          message: "Aucun produit trouvé en base.",
        });
      }

      // 2b) Sinon, on retourne le produit transformé
      return processProductData(data);
    } catch (err) {
      const status = err.response?.status;
      // → 404 ou 400, on considère que le produit n'existe pas en BDD
      if (status === 404 || status === 400) {
        return rejectWithValue({
          code: "NOT_FOUND_DB",
          message: "Produit introuvable.",
        });
      }

      // → network error (axios)
      const isNetworkError =
        err.code === "ERR_NETWORK" ||
        (err.message && err.message.toLowerCase().includes("network error"));

      if (isNetworkError) {
        const fallback = MOCK_SERVICES.find(
          (p) => String(p.id) === String(productId)
        );
        if (fallback) {
          return processProductData(fallback);
        }
        return rejectWithValue({
          code: "OFFLINE_NO_MOCK",
          message: "Hors-ligne et pas de mock disponible.",
        });
      }

      // Autre erreur (500, timeout, etc.) : fallback partiel si mock dispo
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      const fallback = MOCK_SERVICES.find(
        (p) => String(p.id) === String(productId)
      );
      if (fallback) {
        return processProductData(fallback);
      }

      return rejectWithValue({
        code: "UNKNOWN_ERROR",
        message: msg || SEARCH_UNKNOWN_ERROR,
      });
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ keyword = "", page = 0, size = 6 }, { rejectWithValue }) => {
    try {
      const response = await productService.searchProducts({
        keyword,
        page,
        size,
      });
      const data = response.data;

      if (!data || !Array.isArray(data.products)) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCK_TOP_PRODUCTS,
          message: undefined,
        });
      }

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
    // Détail d'un produit unique
    item: null,
    loading: false,
    error: null,
    errorCode: null,

    // Liste complète des produits (cache)
    list: [],
    loadingList: false,
    errorList: null,

    // Recherche de produits
    searchResults: [],
    loadingSearch: false,
    errorSearch: null,
    isSearchMode: false,

    // Pagination des résultats de recherche (si besoin)
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setProductList: (state, action) => {
      state.list = action.payload;
      state.loadingList = false;
      state.errorList = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.isSearchMode = false;
      state.errorSearch = null;
      state.loadingSearch = false;
    },
    // Nouvelle action pour réinitialiser complètement la recherche
    resetToProductList: (state) => {
      state.searchResults = [];
      state.isSearchMode = false;
      state.errorSearch = null;
      state.loadingSearch = false;
      // Réinitialiser les états de la liste si nécessaire
      state.errorList = null;
    },
  },
  extraReducers: (builder) => {
    // fetchProducts (liste de produits)
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
        // Ne pas vider la liste si on est en mode recherche pour éviter le scintillement
        if (!state.isSearchMode) {
          state.list = [];
        }
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

    // fetchProductById
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
        state.item = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload || {
          code: "UNKNOWN_ERROR",
          message: SEARCH_UNKNOWN_ERROR,
        };
        state.error = payload.message;
        state.errorCode = payload.code;
        state.item = null;
      });

    // searchProducts (recherche de produits)
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
        state.isSearchMode = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
        state.errorSearch = null;
        state.isSearchMode = true;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingSearch = false;
        const payload = action.payload || {};
        if (payload.isFallback) {
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

export const { setProductList, clearSearchResults, resetToProductList } =
  productSlice.actions;
export default productSlice.reducer;
