import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { processProductData } from "../../components/utils/productUtils";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

/**
 * Récupère la liste complète des produits depuis l'API.
 * Si l'appel échoue, on rejette avec un tableau fallback (MOCK_TOP_PRODUCTS).
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.PRODUCTS.ALL());
      if (!Array.isArray(response.data) || response.data.length === 0) {
        return rejectWithValue(MOCK_TOP_PRODUCTS);
      }
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(MOCK_TOP_PRODUCTS);
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
      const response = await axios.get(API_ROUTES.PRODUCTS.BY_ID(id));
      console.log("url fetchProductByID", API_ROUTES.PRODUCTS.BY_ID(id));

      return processProductData(response.data);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400 || status === 404) {
        return rejectWithValue("Produit introuvable ou requête invalide");
      }
      return rejectWithValue("Erreur serveur");
    }
  }
);

/*
 * Recherche de produits par mot-clé.
 * Si l'appel échoue, on rejette avec un tableau fallback (MOCK_TOP_PRODUCTS).
 * On utilise un paramètre `page` pour la pagination.
 */
export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ keyword = "", page = 0, size = 6 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_ROUTES.PRODUCTS.SEARCH({ keyword, page, size })
      );
      if (!response.data || !Array.isArray(response.data.products)) {
        return rejectWithValue(MOCK_TOP_PRODUCTS); // fallback mock
      }

      return response.data.products.map(processProductData); // nettoyage
    } catch (err) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(MOCK_TOP_PRODUCTS);
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
  reducers: {},
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingList = false;
        // Si action.payload est un tableau (fallback mock), on l’utilise
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.errorList =
            "Fallback mock appliqué pour la liste des produits.";
        } else {
          state.list = [];
          state.errorList =
            action.payload || "Erreur inconnue lors du fetchProducts";
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
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || "Erreur inconnue";
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
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingList = false;
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.errorList = "Fallback mock utilisé (search)";
        } else {
          state.list = [];
          state.errorList =
            action.payload || "Erreur inconnue dans searchProducts";
        }
      });
  },
});

export default productSlice.reducer;
