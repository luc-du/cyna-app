// Feature : Recherche locale de produits en fallback du backend
// Justification : La route `/products/search` retourne une erreur SQL car le FULLTEXT index est absent.
// Cette solution temporaire permet d’assurer une recherche fluide sans patch backend, pour respecter les délais de soutenance.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

export const fetchAllProducts = createAsyncThunk(
  "search/fetchAllProducts",
  async () => {
    const response = await axios.get(API_ROUTES.PRODUCTS.GET);
    return response.data;
  }
);

const initialState = {
  allProducts: [],
  filtered: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  query: "",
};

/**
 * Slice Redux pour la gestion de la recherche de produits.
 *
 * @namespace search
 * @property {Object} initialState - L'état initial du slice, incluant la requête de recherche, la liste des produits filtrés, etc.
 * @property {Function} setQuery - Action pour mettre à jour la requête de recherche et filtrer les produits correspondants.
 * @property {Function} clearSearch - Action pour réinitialiser la recherche et vider les résultats filtrés.
 * @property {Function} extraReducers - Gère les états asynchrones liés à la récupération de tous les produits (chargement, succès, échec).
 *
 * @example
 * dispatch(setQuery('ordinateur'));
 * dispatch(clearSearch());
 */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      const query = action.payload.toLowerCase();
      state.query = query;
      state.filtered = state.allProducts.filter((product) =>
        `${product.name} ${product.description} ${product.caracteristics}`
          .toLowerCase()
          .includes(query)
      );
    },

    clearSearch: (state) => {
      // Reset complet lors d’un changement de page (cf. SearchBar)
      state.query = "";
      state.filtered = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
