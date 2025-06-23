import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPrice } from "@services/subscriptionService";

export const createPriceThunk = createAsyncThunk(
  "price/create",
  async (priceDto, { rejectWithValue }) => {
    try {
      const data = await createPrice(priceDto);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState: { current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPriceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPriceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createPriceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default priceSlice.reducer;
