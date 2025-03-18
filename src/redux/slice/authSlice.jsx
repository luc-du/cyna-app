import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Développement
// const API_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_BASE_URL = "/api/v1/auth"; //développement
// Prod:
// const API_BASE_URL = "http://localhost:8080/api/v1/auth"; //origin

/* Signup de user */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message?.includes("Duplicate entry")) {
        return rejectWithValue("Cet email est déjà utilisé.");
      }
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
      const response = await axios.post(`${API_BASE_URL}/signin`, credentials);

      localStorage.setItem("token", response.data.token);
      console.log(`Token reçu : ${response.data.token}`);
      alert("Vous êtes authentifié !");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Email ou mot de passe incorrect !"
      );
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
        `${API_BASE_URL}/validate`,
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
