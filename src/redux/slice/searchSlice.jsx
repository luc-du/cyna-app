import {
  FALLBACK_API_MESSAGE,
  FALLBACK_STATE_DEFAULT,
  FALLBACK_STATE_PREFIX,
  SEARCH_UNKNOWN_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

/**
 * Recherche de produits par mot-clé, page, filtres et tri.
 * - Si l’API renvoie un tableau vide → fulfilled([]).
 * - Si l’API est en erreur → rejectWithValue({ isFallback, fallback, message }).
 *
 * @param {{
 *   keyword: string,
 *   page: number,
 *   size: number,
 *   categoriesIds?: Array<number|string>,
 *   features?: Array<string>,
 *   minPrice?: number,
 *   maxPrice?: number,
 *   availableOnly?: boolean,
 *   sort?: string
 * }} params
 */
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (
    {
      keyword = "",
      page = 0,
      size = 6,
      categoriesIds = [],
      features = [],
      minPrice = 0,
      maxPrice = 100000,
      availableOnly = false,
      sort = "priceAsc",
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.set("keyword", keyword);
      queryParams.set("page", page);
      queryParams.set("size", size);
      if (categoriesIds.length) {
        categoriesIds.forEach((id) => queryParams.append("categoriesIds", id));
      }
      if (features.length) {
        features.forEach((f) => queryParams.append("features", f));
      }
      if (minPrice !== undefined) queryParams.set("minPrice", minPrice);
      if (maxPrice !== undefined) queryParams.set("maxPrice", maxPrice);
      if (availableOnly) queryParams.set("availableOnly", true);
      if (sort) queryParams.set("sort", sort);

      const response = await axios.get(
        API_ROUTES.PRODUCTS.SEARCH({ keyword, page, size }) +
          `&${queryParams.toString()}`
      );
      const data = response.data;

      if (!data || !Array.isArray(data.products)) {
        return [];
      }

      return data.products;
    } catch (err) {
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      console.warn("Échec de recherche produits :", msg);

      return rejectWithValue({ message: msg });
    }
  }
);

const initialState = {
  query: "",
  searchResults: [],
  loading: false,
  error: null,
  isSearchMode: false,
  currentPage: 1,
  pageSize: 6,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    /**
     * Met à jour la requête et déclenche le mode recherche
     */
    setQuery: (state, action) => {
      state.query = action.payload;
      state.isSearchMode = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    /**
     * Réinitialise intégralement la recherche (query, résultats, filtres)
     */
    clearSearch: (state) => {
      state.query = "";
      state.searchResults = [];
      state.error = null;
      state.isSearchMode = false;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        if (payload.isFallback) {
          state.searchResults = payload.fallback;
          state.error = payload.message
            ? `${FALLBACK_STATE_PREFIX}${payload.message}`
            : FALLBACK_STATE_DEFAULT;
        } else {
          state.searchResults = [];
          state.error = payload.message || SEARCH_UNKNOWN_ERROR;
        }
      });
  },
});

export const { setQuery, clearSearch, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
