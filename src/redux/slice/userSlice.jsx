import {
  AUTH_PASSWORD_UPDATE_ERROR,
  AUTH_PROFILE_UPDATE_ERROR,
  AUTH_PROFILE_UPLOAD_ERROR,
} from "@lib/errorMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCustomer as apiCreateCustomer } from "@services/subscriptionService";
import * as userService from "@services/userService";

/* Thunks */
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId, thunkAPI) => {
    try {
      return await userService.getUserById(userId);
    } catch {
      return thunkAPI.rejectWithValue("Impossible de charger le profil.");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, updates }, thunkAPI) => {
    try {
      return await userService.updateProfile(userId, updates);
    } catch {
      return thunkAPI.rejectWithValue(AUTH_PROFILE_UPDATE_ERROR);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, passwordPayload }, thunkAPI) => {
    try {
      return await userService.updatePassword(userId, passwordPayload);
    } catch {
      return thunkAPI.rejectWithValue(AUTH_PASSWORD_UPDATE_ERROR);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "user/uploadImage",
  async ({ userId, file }, thunkAPI) => {
    try {
      return await userService.uploadProfileImage(userId, file);
    } catch {
      return thunkAPI.rejectWithValue(AUTH_PROFILE_UPLOAD_ERROR);
    }
  }
);

/**
 * Créer un Customer Stripe pour l’utilisateur courant.
 */
export const createStripeCustomer = createAsyncThunk(
  "user/createStripeCustomer",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { user } = getState().user;
    if (!user) {
      return rejectWithValue("Utilisateur non connecté");
    }
    try {
      await apiCreateCustomer({
        userId: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      });
      // re-récupère le profil mis à jour
      await dispatch(fetchUserProfile(user.id)).unwrap();
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* Slice */
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Récupération du profil réussie
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        // state.profile = id;
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(
        updateUserPassword.fulfilled,
        uploadProfileImage.fulfilled,
        (state, action) => {
          state.loading = false;
        }
      )
      .addCase(
        updateUserProfile.rejected,
        updateUserPassword.rejected,
        uploadProfileImage.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // createStripeCustomer
      .addCase(createStripeCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStripeCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStripeCustomer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
