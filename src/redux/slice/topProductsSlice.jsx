import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_Services } from "../../mock/MOCKS_DATA";

/**
 * Nombre maximum de produits à afficher dans le top produits.
 */
const MAX_TOP_PRODUCTS = 4;

/**
 * Action asynchrone pour récupérer les produits en promotion et actifs depuis l'API.
 * En cas d'échec, utilise des données mockées comme solution de repli.
 */
export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Appel à l'API pour récupérer tous les produits
      const response = await axios.get(API_ROUTES.PRODUCTS.GET);

      // Filtrer les produits en promotion et actifs, puis les mapper au format attendu
      const mapped = response.data
        .filter((prod) => prod.promo === true && prod.active === true)
        .slice(0, MAX_TOP_PRODUCTS)
        .map((prod) => ({
          id: prod.id,
          name: prod.name,
          amount: prod.amount,
          promo: prod.promo,
          imageUrl:
            prod.images?.[0]?.url || "/assets/images/placeholder-product.jpg",
          link: `/products/${prod.id}`,
        }));

      // Retourner la liste des produits mappés
      return mapped;
    } catch (err) {
      // En cas d'erreur, utiliser les données mockées comme fallback
      console.warn("Top products: fallback mock (or error)", err);

      const fallback = MOCK_Services.filter((p) => p.promo === true)
        .slice(0, MAX_TOP_PRODUCTS)
        .map((p) => ({
          id: p.id,
          name: p.name,
          amount: p.amount,
          promo: p.promo,
          imageUrl: p.imageUrl || "/assets/images/placeholder-product.jpg",
          link: `/products/${p.id}`,
        }));

      return rejectWithValue(fallback);
    }
  }
);

/**
 * Slice Redux pour gérer l'état des top produits.
 * - items : liste des produits à afficher
 * - loading : état de chargement
 * - error : message d'erreur éventuel
 */
const topProductsSlice = createSlice({
  name: "topProducts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
        state.error = "Échec API - fallback mock utilisé.";
      });
  },
});

export const topProductsReducer = topProductsSlice.reducer;
