// features/product/productSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "../../components/utils/errorMessages";
import { processProductData } from "../../components/utils/productUtils";
import { MOCK_SERVICES, MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";
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
 * Thunk pour récupérer un produit par son ID :
 * 1. Cherche dans la liste déjà présente (state.list) ;
 * 2. Sinon, fait un GET vers l’API ;
 * 3. Si 404/400 → cherche dans MOCK_SERVICES ; si trouvé, retourne ce fallback ;
 * 4. Sinon, rejette avec message pour afficher 404.
 */
/**
 * Thunk qui récupère un produit par ID.
 * - Si le produit est dans state.list, on retourne directement.
 * - Sinon, on appelle l’API.
 *   • Si status = 200 mais data vide ou mal formé → reject “NOT_FOUND_DB” (BDD vide ou pas de produit).
 *   • Si status = 404 ou 400 → reject “NOT_FOUND_DB”.
 *   • Si network error (err.code === "ERR_NETWORK" ou err.message === "Network Error") → renvoyer le fallback mock ({…}).
 *   • Si autre erreur → reject avec message générique.
 */
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { getState, rejectWithValue }) => {
    const state = getState().product;
    const fullList = state.list || [];

    // 1) Vérifier dans le cache (state.list)
    const existInState = fullList.find(
      (p) => String(p.id) === String(productId)
    );
    if (existInState) {
      return processProductData(existInState);
    }

    // 2) Appel à l’API
    try {
      const response = await productService.getProductById(productId);
      const data = response.data;

      // 2a) Si l’API renvoie un 200 OK mais data est null / vide / mal formé
      //     (par exemple le backend retourne {} ou null quand la BDD est vide),
      //     on rejette avec un code spécifique “NOT_FOUND_DB” pour informer le composant.
      if (!data || Object.keys(data).length === 0) {
        return rejectWithValue({
          code: "NOT_FOUND_DB",
          message: "Aucun produit trouvé en base.",
        });
      }

      // 2b) Sinon, on retourne le produit transformé
      return processProductData(data);
    } catch (err) {
      // 3) On capte la nature de l’erreur
      const status = err.response?.status;
      // → 404 ou 400, on considère que le produit n’existe pas en BDD
      if (status === 404 || status === 400) {
        return rejectWithValue({
          code: "NOT_FOUND_DB",
          message: "Produit introuvable.",
        });
      }

      // → network error (axios) : err.code === "ERR_NETWORK" ou err.message === "Network Error"
      const isNetworkError =
        err.code === "ERR_NETWORK" ||
        (err.message && err.message.toLowerCase().includes("network error"));

      if (isNetworkError) {
        // Retrouver le fallback mock
        const fallback = MOCK_SERVICES.find(
          (p) => String(p.id) === String(productId)
        );
        if (fallback) {
          return processProductData(fallback);
        }
        // Même s’il n’y a pas de fallback, on peut renvoyer rejectWithValue("OFFLINE_NO_MOCK")
        return rejectWithValue({
          code: "OFFLINE_NO_MOCK",
          message: "Hors-ligne et pas de mock disponible.",
        });
      }

      // 4) Autre erreur (500, timeout, etc.) : fallback partiel si on trouve un mock, sinon reject
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
/**
 * Recherche de produits par mot-clé.
 * Si l'appel échoue ou ne renvoie pas un tableau, on rejette avec un objet fallback.
 */
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
    // Exemple : on peut stocker la liste manuellement après fetchProducts
    setProductList: (state, action) => {
      state.list = action.payload;
      state.loadingList = false;
      state.errorList = null;
    },
  },
  extraReducers: (builder) => {
    // ─── fetchProducts (liste de produits) ───────────────────────────────────
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

    // ─── fetchProductById ───────────────────────────────────────────────────
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
        // action.payload = { code: "...", message: "..." }
        const payload = action.payload || {
          code: "UNKNOWN_ERROR",
          message: SEARCH_UNKNOWN_ERROR,
        };
        state.error = payload.message;
        state.errorCode = payload.code;
        state.item = null;
      });
    // ─── searchProducts (recherche de produits) ──────────────────────────────
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

export const { setProductList } = productSlice.actions;
export default productSlice.reducer;
