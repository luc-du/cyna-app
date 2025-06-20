import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createSubscription,
  getSubscriptionByCustomer,
} from "../../services/subscriptionService";

export const createCustomerSubscription = createAsyncThunk(
  "subscription/create",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createSubscription(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCustomerSubscription = createAsyncThunk(
  "subscription/fetchByCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await getSubscriptionByCustomer(customerId);
      return Array.isArray(response) ? response : [response];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    current: [], // Initialiser comme un tableau vide pour stocker les abonnements
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomerSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        // Quand une nouvelle souscription est créée, l'ajouter au tableau
        // Ou si tu ne gères qu'un seul abonnement actif, tu peux le remplacer
        state.current = [payload]; // Stocke le nouvel abonnement dans un tableau
      })
      .addCase(createCustomerSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchCustomerSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCustomerSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Erreur lors du chargement de subscription";
      });
  },
});

export default subscriptionSlice.reducer;
