import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// const API_URL = "/api/v1/address";
const API_URL = API_ROUTES.ADDRESS.BY_USER;

// Thunk pour récup les adresses par l'ID se user
export const fetchUserAddresses = createAsyncThunk(
  "address/getUserAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Impossible de récupérer les addresses"
      );
    }
  }
);

/* *** State initial *** */

const initialState = {
  list: [],
  loading: false,
  error: null,
};

/* ***Slice*** */
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.list = null;
      })

      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
