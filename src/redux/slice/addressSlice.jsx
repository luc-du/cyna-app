import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// CREATE
export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, { rejectWithValue }) => {
    console.log(addressData);

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
      console.log(token.userId);
      console.log("Response data:", response.data);
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

// READ
/* simple fetch de user via le token */

// UPDATE
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ addressId, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_ROUTES.ADDRESS.DELETE(addressId)}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    }
  }
);

/* DELETE */
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
