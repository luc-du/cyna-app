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

export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        // API_ROUTES.ADDRESS.CREATE,
        `http://localhost:8080/api/v1/address`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'ajout de l'adresse"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8081/api/v1/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return addressId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de la suppression de l'adresse"
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
      // Fetch user addresses cases
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
        if (state.list) {
          state.list.push(action.payload);
        } else {
          state.list = [action.payload];
        }
        state.error = null;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Delete address
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
