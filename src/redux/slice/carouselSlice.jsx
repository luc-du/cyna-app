import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "../../lib/errorMessages";
import { MOCKSLIDES } from "../../mock/MOCKS_DATA";
import { getCarouselSlides } from "../../services/carouselService";

/**
 * Thunk asynchrone pour récupérer les slides depuis l'API.
 * En cas d’erreur ou de tableau vide, on tombe en fallback sur MOCKSLIDES.
 */
export const fetchCarouselSlides = createAsyncThunk(
  "carousel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCarouselSlides();
      // Vérifier que data est un tableau non vide
      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCKSLIDES,
          message: undefined,
        });
      }
      return data;
    } catch (err) {
      // Récupérer un message d’erreur clair si possible
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      return rejectWithValue({
        isFallback: true,
        fallback: MOCKSLIDES,
        message: msg,
      });
    }
  }
);

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    slides: [], // Liste des slides formatées
    loading: false,
    error: null,
  },
  reducers: {
    // (pas d’actions synchrones supplémentaires pour l’instant)
  },
  extraReducers: (builder) => {
    builder
      // ─── fetchCarouselSlides ────────────────────────────────────────────────────
      .addCase(fetchCarouselSlides.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.slides = [];
      })
      .addCase(fetchCarouselSlides.fulfilled, (state, action) => {
        state.loading = false;
        // On peut formater ici les données brutes avant de stocker
        state.slides = action.payload.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          description: item.text,
          ctaText: item.ctaText || "Voir nos produits",
          ctaLink: item.ctaLink || "/categories",
        }));
        state.error = null;
      })
      .addCase(fetchCarouselSlides.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        if (payload.isFallback) {
          // MOCKSLIDES + message
          state.slides = payload.fallback.map((item) => ({
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.title,
            description: item.text,
            ctaText: item.ctaText || "Voir nos produits",
            ctaLink: item.ctaLink || "/categories",
          }));
          state.error = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.slides = [];
          state.error = payload || SEARCH_UNKNOWN_ERROR;
        }
      });
  },
});

export default carouselSlice.reducer;
