import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AUTH_PASSWORD_UPDATE_ERROR,
  AUTH_PROFILE_UPDATE_ERROR,
  AUTH_PROFILE_UPLOAD_ERROR,
} from "../../components/utils/errorMessages";
import * as userService from "../../services/userService";

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

/* Slice */
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
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
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      // Récupération du profil échouée
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.profile = action.payload;
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
      );
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
