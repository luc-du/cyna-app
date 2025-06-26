import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  cancelCustomerSubscription,
  createSubscription,
  getSubscriptionByCustomer,
  updateSubscription,
} from "@services/subscriptionService";

/**
 * Crée une souscription pour un client
 */
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

/**
 * Récupère les souscriptions d'un client
 */
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

/**
 * Modifie une souscription existante
 */
export const modifySubscription = createAsyncThunk(
  "subscription/modify",
  async ({ subscriptionId, priceId, quantity }, { rejectWithValue }) => {
    try {
      const updated = await updateSubscription({
        subscriptionId,
        priceId,
        quantity,
      });
      return updated;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

/**
 * Supprime une souscription existante
 */
export const removeSubscription = createAsyncThunk(
  "subscription/remove",
  async (subscriptionId, { rejectWithValue }) => {
    try {
      await cancelCustomerSubscription(subscriptionId);
      return subscriptionId;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    current: [],
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
        state.current = [payload];
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
      })
      .addCase(modifySubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifySubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        const index = state.current.findIndex((sub) => sub.id === payload.id);
        if (index !== -1) {
          state.current[index] = payload;
        }
      })
      .addCase(modifySubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(removeSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.current = state.current.filter((sub) => sub.id !== payload);
      })
      .addCase(removeSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default subscriptionSlice.reducer;
