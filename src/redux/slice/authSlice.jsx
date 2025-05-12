import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../../api/apiRoutes";

/* Signup de user */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ROUTES.AUTH.SIGNUP, userData);
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
      const response = await axios.post(API_ROUTES.AUTH.SIGNIN, credentials);
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
        API_ROUTES.AUTH.VALIDATE,
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

/* Récupérer les informations du profil utilisateur */
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      // Décryptage du token
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.jti;
      console.log(userId);

      const response = await axios.get(API_ROUTES.USER.BY_ID(userId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur API (profil) :",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Impossible de récupérer le profil utilisateur"
      );
    }
  }
);

/* Mise çà jour des info du profil utilisateur */
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        API_ROUTES.USER.BY_ID(userId),
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du profil"
      );
    }
  }
);

/* Slice */
const initialState = {
  user: null,
  userId: null,
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
        const token = action.payload.token;
        const decoded = jwtDecode(token);
        state.userId = decoded.jti;
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
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
