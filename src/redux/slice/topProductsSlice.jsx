import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeHolder } from "@utils/indexImages";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import sortProductsByPriority from "../../components/utils/sortProductByPriority";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

/**
 * Nombre maximum de produits à afficher dans le top produits.
 */
const MAX_TOP_PRODUCTS = 4;

/**
 * Action asynchrone pour récupérer les produits en promotion et actifs depuis l'API.
 * - Si l'API renvoie un tableau vide → fallback mock.
 * - En cas d'erreur réseau/serveur → fallback mock avec message.
 */
export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_ROUTES.PRODUCTS.GET_TOP_PRODUCTS({
          top: MAX_TOP_PRODUCTS,
          promo: true,
          active: true,
        })
      );

      // On limite et mappe la réponse
      const mapped = response.data.slice(0, MAX_TOP_PRODUCTS).map((prod) => ({
        id: prod.id,
        name: prod.name,
        amount: prod.amount,
        promo: prod.promo,
        active: prod.active,
        imageUrl: prod.images?.[0]?.url || placeHolder,
        link: `/products/${prod.id}`,
      }));

      // Si la liste est vide → fallback
      if (mapped.length === 0) {
        const fallback = MOCK_TOP_PRODUCTS.slice(0, MAX_TOP_PRODUCTS);
        console.warn(
          "fetchTopProducts: réponse vide de l'API, utilisation du fallback mock."
        );
        return rejectWithValue({
          isFallback: true,
          fallback: sortProductsByPriority(fallback),
          message: undefined,
        });
      }

      // On trie par priorité avant de renvoyer
      return sortProductsByPriority(mapped);
    } catch (err) {
      // En cas d'erreur réseau/serveur → fallback avec message
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      console.warn(
        "fetchTopProducts: erreur API, fallback sur MOCK_TOP_PRODUCTS",
        msg
      );
      const fallback = MOCK_TOP_PRODUCTS.slice(0, MAX_TOP_PRODUCTS);
      return rejectWithValue({
        isFallback: true,
        fallback: sortProductsByPriority(fallback),
        message: msg,
      });
    }
  }
);

/**
 * Slice Redux pour gérer l'état des top produits.
 * - items   : liste des produits à afficher (triés par priorité)
 * - loading : état de chargement
 * - error   : message d'erreur éventuel
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
        state.items = [];
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        if (payload.isFallback) {
          state.items = payload.fallback;
          state.error = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.items = [];
          state.error = payload || SEARCH_UNKNOWN_ERROR;
        }
      });
  },
});

export const topProductsReducer = topProductsSlice.reducer;
