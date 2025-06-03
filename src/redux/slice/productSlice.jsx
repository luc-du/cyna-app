import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
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
      // Si la réponse est vide, on considère un fallback mock
      if (!Array.isArray(response.data) || response.data.length === 0) {
        // On rejette pour passer dans la logique de fallback
        return rejectWithValue(MOCK_TOP_PRODUCTS);
      }
      return response.data;
    } catch (error) {
      // S'il y a un message d'erreur venant du serveur, on le transmet
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      // Sinon, on rejette avec les mocks
      return rejectWithValue(MOCK_TOP_PRODUCTS);
    }
  }
);

/**
 * Récupère un produit unique depuis l'API à partir de son productId.
 * Si l'appel échoue, on rejette avec un message d'erreur.
 */
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.PRODUCTS.BY_ID(productId));
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Échec de la récupération du produit");
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
  },
});

export default productSlice.reducer;
