import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router";

const API_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_BASE_URL = "http://localhost:8080/api/v1/auth";

/* Signup de user */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_PROXY}${API_BASE_URL}/signup`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'inscription"
      );
    }
  }
);

/* Login user */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_PROXY}${API_BASE_URL}/signin`,
        credentials
      );

      localStorage.setItem("token", response.data.token);
      console.log(`Token créée ${data.token}`);
      alert(`Vous êtes auth!`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Pair login incorrect!");
    }
  }
);

/* Check du token */
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      const response = await axios.post(
        `${API_PROXY}${API_BASE_URL}/validate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Token invalide");
    }
  }
);

/* Slice */
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(validateToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(validateToken.rejected, (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
