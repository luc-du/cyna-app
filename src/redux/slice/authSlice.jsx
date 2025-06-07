// redux/slice/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearToken, setToken } from "../../components/utils/authStorage";
import {
  AUTH_INVALID_CREDENTIALS_ERROR,
  AUTH_SIGNUP_ERROR,
  TOKEN_EXPIRED_ERROR,
} from "../../components/utils/errorMessages";
import {
  signin,
  signup,
  validateToken as validateTokenService,
} from "../../services/authServices";

// État initial minimal
const initialState = {
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

/**
 * 🔐 Authentification - login
 * @param {Object} credentials - Objet contenant email et mot de passe
 */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const token = await signin(credentials);
      setToken(token);
      return token;
    } catch (err) {
      const message =
        err?.response?.data?.message || AUTH_INVALID_CREDENTIALS_ERROR;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * 🧾 Inscription - register
 * @param {Object} userData - Données d'inscription utilisateur
 */
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const token = await signup(userData);
      setToken(token);
      return token;
    } catch (err) {
      const message = err?.response?.data?.message || AUTH_SIGNUP_ERROR;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * ✅ Validation du token JWT
 */
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, thunkAPI) => {
    try {
      const token = await validateTokenService();
      return token;
    } catch (err) {
      const message = err?.response?.data?.message || TOKEN_EXPIRED_ERROR;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(validateToken.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        clearToken();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
