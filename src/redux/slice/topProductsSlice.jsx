import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

/**
 * Nombre maximum de produits à afficher dans le top produits.
 */
const MAX_TOP_PRODUCTS = 4; // ou la valeur que vous souhaitez
/**
 * Action asynchrone pour récupérer les produits en promotion et actifs depuis l'API.
 * En cas d'échec, renvoie directement un fallback issu de MOCK_TOP_PRODUCTS.
 */
export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async () => {
    try {
      // Appel à l'API pour récupérer tous les produits
      const response = await axios.get(API_ROUTES.PRODUCTS.GET_TOP_PRODUCTS);

      // Filtrer les produits en promo et actifs, mapper au format attendu
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

      // Si la liste filtrée est vide, on renvoie également le fallback
      if (mapped.length === 0) {
        console.warn(
          "fetchTopProducts: réponse vide de l'API, utilisation du fallback mock."
        );
        return MOCK_TOP_PRODUCTS.filter((p) => p.promo === true)
          .slice(0, MAX_TOP_PRODUCTS)
          .map((p) => ({
            id: p.id,
            name: p.name,
            amount: p.amount,
            promo: p.promo,
            imageUrl: p.imageUrl || "/assets/images/placeholder-product.jpg",
            link: `/products/${p.id}`,
          }));
      }

      return mapped;
    } catch (err) {
      // En cas d'erreur réseau / 500 / etc., on utilise le mock
      console.warn(
        "fetchTopProducts: erreur API, fallback sur MOCK_TOP_PRODUCTS",
        err
      );

      return MOCK_TOP_PRODUCTS.filter((p) => p.promo === true)
        .slice(0, MAX_TOP_PRODUCTS)
        .map((p) => ({
          id: p.id,
          name: p.name,
          amount: p.amount,
          promo: p.promo,
          imageUrl: p.imageUrl || "/assets/images/placeholder-product.jpg",
          link: `/products/${p.id}`,
        }));
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
        state.items = MOCK_TOP_PRODUCTS;
      });
  },
});

export const topProductsReducer = topProductsSlice.reducer;
