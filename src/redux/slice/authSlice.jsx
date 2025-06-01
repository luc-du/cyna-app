import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../../api/apiRoutes";
import {
  clearToken,
  getToken,
  setToken,
} from "../../components/utils/authStorage";

/**
 * Thunks asynchrones pour les opérations d'authentification
 */

/* Inscription de l'utilisateur */
export const registerUser = createAsyncThunk(
  "auth/register",
  /**
   * @param {Object} userData - Données du nouvel utilisateur
   * @param {Object} thunkAPI - Outils Redux Toolkit
   */
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ROUTES.AUTH.SIGNUP, userData);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      // Gestion d'une erreur d'email déjà utilisé
      if (error.response?.data?.message?.includes("Duplicate entry")) {
        return rejectWithValue("Cet email est déjà utilisé.");
      }
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'inscription"
      );
    }
  }
);

/* Connexion de l'utilisateur */
export const loginUser = createAsyncThunk(
  "auth/login",
  /**
   * @param {Object} credentials - Identifiants de connexion
   * @param {Object} thunkAPI - Outils Redux Toolkit
   */
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ROUTES.AUTH.SIGNIN, credentials);
      setToken(response.data.token);
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

/* Vérification de la validité du token */
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  /**
   * @param {void}
   * @param {Object} thunkAPI - Outils Redux Toolkit
   */
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
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
      // Suppression du token invalide
      clearToken();
      return rejectWithValue(error.response?.data || "Token invalide");
    }
  }
);

/* Récupération des informations du profil utilisateur */
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  /**
   * @param {void}
   * @param {Object} thunkAPI - Outils Redux Toolkit
   */
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token non disponible");
      }

      // Décodage du token JWT pour obtenir l'ID utilisateur
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

/* Mise à jour des informations du profil utilisateur */
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  /**
   * @param {Object} param0 - Contient userId et profileData
   * @param {Object} thunkAPI - Outils Redux Toolkit
   */
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const token = getToken();
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

/**
 * Slice Redux pour l'authentification
 */

// État initial du slice d'authentification
const initialState = {
  user: null, // Données utilisateur
  userId: null, // ID utilisateur
  isAuthenticated: !!getToken(), // Authentifié si un token est présent
  loading: false, // Indique si une opération est en cours
  error: null, // Message d'erreur éventuel
};

/**
 * Slice Redux pour la gestion de l'authentification utilisateur.
 *
 * Ce slice gère l'état d'authentification, les informations utilisateur, l'ID utilisateur,
 * ainsi que les erreurs liées à l'inscription, la connexion, la validation du token et la récupération du profil utilisateur.
 *
 * Actions synchrones :
 * - logout : Déconnecte l'utilisateur et réinitialise l'état d'authentification.
 * - setAuth : Met à jour le statut d'authentification.
 * - setUser : Met à jour les données de l'utilisateur.
 * - setUserId : Met à jour l'ID de l'utilisateur.
 *
 * Actions asynchrones (extraReducers) :
 * - registerUser : Gère l'inscription de l'utilisateur (succès/échec).
 * - loginUser : Gère la connexion de l'utilisateur (succès/échec).
 * - validateToken : Valide le token d'authentification (succès/échec).
 * - fetchUserProfile : Récupère le profil utilisateur (succès/échec).
 *
 * @module authSlice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Déconnexion de l'utilisateur
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      clearToken();
    },
    // Mise à jour du statut d'authentification
    setAuth: (state, action) => {
      state.isAuthenticated = !!action.payload;
    },
    // Mise à jour des données utilisateur
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Mise à jour de l'ID utilisateur
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Inscription réussie
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const decoded = jwtDecode(token);
        state.userId = decoded.jti;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Inscription échouée
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Connexion réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const decoded = jwtDecode(token);
        state.userId = decoded.jti;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Connexion échouée
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Validation du token réussie
      .addCase(validateToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      // Validation du token échouée
      .addCase(validateToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userId = null;
      })
      // Récupération du profil utilisateur réussie
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      // Récupération du profil utilisateur échouée
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export des actions et du reducer
export const { logout, setAuth, setUser, setUserId } = authSlice.actions;
export default authSlice.reducer;
