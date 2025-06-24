import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentService from "@services/paymentService";

/**
 * Thunks asynchrones
 */

// 1. Récupérer toutes les méthodes de paiement
export const fetchPaymentMethods = createAsyncThunk(
  "payment/fetchAll",
  async (customerId, { rejectWithValue }) => {
    try {
      const data = await paymentService.fetchPaymentMethods(customerId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Ajouter une méthode de paiement
export const addPaymentMethod = createAsyncThunk(
  "payment/add",
  async (paymentData, { rejectWithValue }) => {
    try {
      const data = await paymentService.addPaymentMethod(paymentData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3. Supprimer une méthode
export const deletePaymentMethod = createAsyncThunk(
  "payment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await paymentService.deletePaymentMethod(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4. Définir une méthode par défaut
export const setDefaultPaymentMethod = createAsyncThunk(
  "payment/setDefault",
  async ({ id, customerId }, { rejectWithValue }) => {
    try {
      await paymentService.setDefaultPaymentMethod(id, customerId);
      console.log("SetDefault card");

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Slice
 */
const initialState = {
  list: [],
  loading: false,
  error: null,
  deleting: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPaymentMethods
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // addPaymentMethod
    builder
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        // MEttre un auto*refetch? via fetchPaymentMethods ?
        state.list.push(action.payload);
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deletePaymentMethod
    builder
      .addCase(deletePaymentMethod.pending, (state, { meta }) => {
        state.loading = true;
        state.error = null;
        state.deleting = meta.arg;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((m) => m.id !== action.payload);
      })
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // setDefaultPaymentMethod
    builder
      .addCase(setDefaultPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((m) => ({
          ...m,
          isDefault: m.id === action.payload, //check un seul élément par défaut et uncheck les autres
        }));
      })
      .addCase(setDefaultPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
