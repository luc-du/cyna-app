import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword as forgotPasswordService,
  login as loginService,
  register as registerService,
  validateToken as validateTokenService,
  verifyEmail as verifyEmailService,
} from "../../services/authServices";

import {
  clearToken,
  getToken,
  setToken,
} from "../../components/utils/authStorage";

import {
  AUTH_EMAIL_ALREADY_EXISTS_ERROR,
  AUTH_EMAIL_VERIFICATION_FAILED,
  AUTH_FORGOT_PASSWORD_ERROR,
  AUTH_INVALID_CREDENTIALS_ERROR,
  AUTH_LOGIN_ERROR,
  AUTH_SIGNUP_ERROR,
  AUTH_USER_NOT_FOUND_ERROR,
  TOKEN_EXPIRED_ERROR,
} from "../../components/utils/errorMessages";

const initialState = {
  user: null,
  token: getToken() || null,
  status: "idle",
  error: null,
};

/// ──────────────────────────────────────────────
/// THUNKS ASYNCHRONES
/// ──────────────────────────────────────────────

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginService(credentials);
      setToken(data.token);
      return data;
    } catch (err) {
      if (err.response?.status === 401) {
        return thunkAPI.rejectWithValue(AUTH_INVALID_CREDENTIALS_ERROR);
      }
      return thunkAPI.rejectWithValue(AUTH_LOGIN_ERROR);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const data = await registerService(formData);
      return data;
    } catch (err) {
      if (err.response?.status === 409) {
        return thunkAPI.rejectWithValue(AUTH_EMAIL_ALREADY_EXISTS_ERROR);
      }
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(AUTH_SIGNUP_ERROR);
      }
      return thunkAPI.rejectWithValue(AUTH_SIGNUP_ERROR);
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, thunkAPI) => {
    try {
      const data = await validateTokenService();
      return data;
    } catch (err) {
      if (err.response?.status === 401) {
        clearToken();
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue(TOKEN_EXPIRED_ERROR);
      }
      return thunkAPI.rejectWithValue(TOKEN_EXPIRED_ERROR);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const data = await forgotPasswordService(email);
      return data;
    } catch (err) {
      if (err.response?.status === 404) {
        return thunkAPI.rejectWithValue(AUTH_USER_NOT_FOUND_ERROR);
      }
      return thunkAPI.rejectWithValue(AUTH_FORGOT_PASSWORD_ERROR);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (email, thunkAPI) => {
    try {
      const data = await verifyEmailService(email);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err, AUTH_EMAIL_VERIFICATION_FAILED);
    }
  }
);

/// ──────────────────────────────────────────────
/// SLICE
/// ──────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      clearToken();
    },
    clearAuthError: (state) => {
      state.error = null;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(validateToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
