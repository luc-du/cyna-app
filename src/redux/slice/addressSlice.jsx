import {
  ADDRESS_CREATE_ERROR,
  ADDRESS_DELETE_ERROR,
  ADDRESS_UPDATE_ERROR,
  ADDRESSES_GET_ERROR,
} from "@lib/errorMessages";
import {
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_UPDATE_SUCCESS,
} from "@lib/successMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as addressService from "@services/addressService";

// Créer une nouvelle adresse
export const createAddress = createAsyncThunk(
  "address/create",
  async (payload, thunkAPI) => {
    try {
      return await addressService.createAddress(payload);
    } catch (error) {
      console.error(ADDRESS_CREATE_ERROR, error);
      return thunkAPI.rejectWithValue(ADDRESS_CREATE_ERROR);
    }
  }
);

// Récupérer les addresses de user
export const getUserAddresses = createAsyncThunk(
  "address/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await addressService.fetchUserAddresses(userId);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(ADDRESSES_GET_ERROR);
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
      console.error(ADDRESS_UPDATE_ERROR, error);
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
      console.error(ADDRESS_DELETE_ERROR, error);
      return thunkAPI.rejectWithValue(ADDRESS_DELETE_ERROR);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: null,
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
      // createAddress
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = "Adresse ajoutée avec succès.";
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // getUserAddresses
      .addCase(getUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddresses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.list = payload;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      })

      // updateAddress
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = ADDRESS_UPDATE_SUCCESS;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // deleteAddress
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = ADDRESS_DELETE_SUCCESS;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { clearAddressState } = addressSlice.actions;
export default addressSlice.reducer;
