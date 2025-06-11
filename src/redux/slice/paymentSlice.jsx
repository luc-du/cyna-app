import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PAYMENT_ADDED_ERROR } from "../../components/utils/errorMessages";
import { PAYMENT_ADDED_SUCCESS } from "../../components/utils/successMessages";
import * as subscriptionService from "../services/subscriptionService";

// Thunk pour POST /payment-methods
export const addPaymentMethod = createAsyncThunk(
  "payment/add",
  async (payload, thunkAPI) => {
    try {
      return await subscriptionService.addPaymentMethod(payload);
    } catch (error) {
      console.error(PAYMENT_ADDED_ERROR, error);
      return thunkAPI.rejectWithValue(PAYMENT_ADDED_ERROR);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    list: [], // on y ajoutera fetchPaymentMethods plus tard
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // addPaymentMethod
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = PAYMENT_ADDED_SUCCESS;
        // on pourra pusher payload dans state.list si on veut update UI instantanément
      })
      .addCase(addPaymentMethod.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
