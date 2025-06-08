import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADDRESS_CREATE_ERROR,
  ADDRESS_DELETE_ERROR,
  ADDRESS_UPDATE_ERROR,
} from "../../components/utils/errorMessages";
import * as addressService from "../../services/addressService";

// Créer une nouvelle adresse
export const createAddress = createAsyncThunk(
  "address/create",
  async (payload, thunkAPI) => {
    try {
      return await addressService.createAddress(payload);
    } catch (error) {
      console.error("Erreur création adresse :", error);
      return thunkAPI.rejectWithValue(ADDRESS_CREATE_ERROR);
    }
  }
);

// Mettre à jour une adresse existante
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ addressId, updatedData }, thunkAPI) => {
    try {
      return await addressService.updateAddress(addressId, updatedData);
    } catch (error) {
      console.error("Erreur mise à jour adresse :", error);
      return thunkAPI.rejectWithValue(ADDRESS_UPDATE_ERROR);
    }
  }
);

// Supprimer une adresse
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, thunkAPI) => {
    try {
      return await addressService.deleteAddress(addressId);
    } catch (error) {
      console.error("Erreur suppression adresse :", error);
      return thunkAPI.rejectWithValue(ADDRESS_DELETE_ERROR);
    }
  }
);

// Slice Redux (optionnel : utile si tu veux centraliser dans `state.address`)
const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    error: null,
    success: null, // Pour afficher un toast global si nécessaire
  },
  reducers: {
    clearAddressState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = "Adresse ajoutée avec succès.";
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = "Adresse mise à jour avec succès.";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = "Adresse supprimée avec succès.";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressState } = addressSlice.actions;
export default addressSlice.reducer;
