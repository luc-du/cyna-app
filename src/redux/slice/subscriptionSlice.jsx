import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSubscription } from "../../services/subscriptionService";

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

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: { current: null, loading: false, error: false },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.current = payload;
      })
      .addCase(createSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default subscriptionSlice.reducer;
