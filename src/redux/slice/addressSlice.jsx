import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// Thunk pour récup les adresses par l'ID utilisateur
export const fetchUserAddresses = createAsyncThunk(
  "address/getUserAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/api/v1/user/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Impossible de récupérer les adresses"
      );
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ROUTES.ADDRESS.CREATE(),
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur de création d'adresse :",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'ajout de l'adresse"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      console.log("Suppression adresse ID :", addressId);
      console.log("Token utilisé :", token);

      await axios.delete(API_ROUTES.ADDRESS.DELETE(addressId), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return addressId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  }
);

// État initial
const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Slice Redux
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get addresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create address
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.error = null;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (address) => address.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
