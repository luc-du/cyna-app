import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCarouselSlides } from "@services/carouselService";
import { MOCKSLIDES } from "../../mock/MOCKS_DATA";

/**
 * Thunk pour récupérer les slides depuis l'API.
 * En cas d’erreur ou de tableau vide, on tombe en fallback sur MOCKSLIDES.
 */
export const fetchCarouselSlides = createAsyncThunk(
  "carousel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCarouselSlides();
      if (!Array.isArray(data) || data.length === 0) {
        return rejectWithValue({
          isFallback: true,
          fallback: MOCKSLIDES,
          message: undefined,
        });
      }
      return data;
    } catch (err) {
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
    slides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchCarouselSlides
      .addCase(fetchCarouselSlides.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.slides = [];
      })
      .addCase(fetchCarouselSlides.fulfilled, (state, action) => {
        state.loading = false;
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
