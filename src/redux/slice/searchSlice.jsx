import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { FALLBACK_API_MESSAGE } from "../../components/utils/errorMessages";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

// ─── Async Thunk ──────────────────────────────────────────────────
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
      // Construction des query params dynamiques
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

      // Appel à l’API
      const response = await axios.get(
        API_ROUTES.PRODUCTS.SEARCH({ keyword, page, size }) +
          `&${queryParams.toString()}`
      );
      const data = response.data;

      // Si pas de résultat côté backend
      if (
        !data ||
        !Array.isArray(data.products) ||
        data.products.length === 0
      ) {
        return [];
      }

      return data.products;
    } catch (err) {
      // En cas d'erreur réseau / serveur → fallback local (mock) filtré
      const msg = err.response?.data?.message || FALLBACK_API_MESSAGE;
      console.warn(
        "Recherche de produits échouée, utilisation du fallback :",
        msg
      );

      // Filtrer MOCK_TOP_PRODUCTS localement selon les mêmes critères
      const filteredMock = MOCK_TOP_PRODUCTS.filter((product) => {
        // Reconstitution d’une « haystack » qui contiendra nom, description, caractéristiques
        const haystack = `${product.name} ${product.description || ""} ${
          product.caracteristics || ""
        }`.toLowerCase();

        // 1) correspondance mot-clé
        if (keyword && !haystack.includes(keyword.toLowerCase())) {
          return false;
        }

        // 2) correspondance catégorie (si renseignée)
        if (
          categoriesIds.length &&
          !product.categoriesIds?.some((id) => categoriesIds.includes(id))
        ) {
          return false;
        }

        // 3) correspondance features (si renseignées)
        if (
          features.length &&
          !features.every((f) =>
            (product.caracteristics || "")
              .toLowerCase()
              .includes(f.toLowerCase())
          )
        ) {
          return false;
        }

        // 4) intervalle de prix
        if (product.amount < minPrice || product.amount > maxPrice) {
          return false;
        }

        // 5) disponibilité
        if (availableOnly && !product.available) {
          return false;
        }

        // Si on arrive ici, on conserve le produit
        return true;
      });

      return rejectWithValue({
        isFallback: true,
        fallback: filteredMock,
        message: msg,
      });
    }
  }
);

const initialState = {
  query: "",
  searchResults: [],
  loading: false,
  error: null,
  isSearchMode: false,
  currentPage: 0,
  pageSize: 6,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    /**
     * Met à jour la requête (keyword) et déclenche le mode recherche
     */
    setQuery: (state, action) => {
      state.query = action.payload;
      state.isSearchMode = true;
    },
    /**
     * Réinitialise intégralement la recherche (query, résultats, filtres)
     */
    clearSearch: (state) => {
      state.query = "";
      state.searchResults = [];
      state.error = null;
      state.isSearchMode = false;
      state.currentPage = 0;
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

        // if (payload.isFallback) {
        //   state.searchResults = payload.fallback;
        //   state.error = payload.message
        //     ? `${FALLBACK_STATE_PREFIX}${payload.message}`
        //     : FALLBACK_STATE_DEFAULT;
        // } else {
        //   state.searchResults = [];
        //   state.error = payload.message || SEARCH_UNKNOWN_ERROR;
        // }
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
