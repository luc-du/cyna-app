/**
 * Slice Redux pour la gestion de l'authentification utilisateur.
 *
 * Ce fichier contient :
 * - Les thunks asynchrones pour l'inscription, la connexion, la validation du token,
 *   la récupération et la mise à jour du profil utilisateur.
 * - Le slice Redux pour gérer l'état d'authentification, l'utilisateur courant,
 *   l'identifiant utilisateur, les erreurs et le chargement.
 *
 * Utilise Redux Toolkit et AuthService pour centraliser la logique d'authentification.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "@services/authServices";
import { jwtDecode } from "jwt-decode";
import {
  clearToken,
  getToken,
  setToken,
} from "../../components/utils/auth/authStorage";

/**
 * Thunks asynchrones utilisant le service d'authentification centralisé
 */

// Inscription utilisateur
export const registerUser = createAsyncThunk(
  "auth/register",
  /**
   * @param {Object} userData - Données d'inscription de l'utilisateur
   * @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
   */
  async (userData, { rejectWithValue }) => {
    try {
      const data = await AuthService.register(userData);
      setToken(data.token);
      return data;
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

// Connexion utilisateur
export const loginUser = createAsyncThunk(
  "auth/login",
  /**
   * @param {Object} credentials - Identifiants de connexion
   * @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
   */
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await AuthService.login(credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      let message = "Email ou mot de passe incorrect !";
      if (error.response?.data?.message?.includes("Account not activate")) {
        message = "Votre compte n'est pas encore activé.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Validation du token d'authentification
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  /**
   * @param {void} _ - Non utilisé
   * @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
   */
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Token manquant");
      await AuthService.validate();
      return true;
    } catch (error) {
      clearToken();
      return rejectWithValue(error.response?.data || "Token invalide");
    }
  }
);

// Mise à jour du profil utilisateur
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  /**
   * @param {Object} param0 - Objet contenant userId et profileData
   * @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
   */
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const res = await AuthService.updateProfile(userId, profileData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du profil"
      );
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.changePassword(payload);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue("Le serveur n'a pas répondu");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/**
 * État initial du slice d'authentification
 * @typedef {Object} AuthState
 * @property {Object|null} user - Données utilisateur
 * @property {string|null} userId - Identifiant utilisateur
 * @property {boolean} isAuthenticated - Statut d'authentification
 * @property {boolean} loading - Statut de chargement
 * @property {string|null} error - Message d'erreur éventuel
 */
const initialState = {
  user: null,
  userId: null,
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
  passwordChangeLoading: false,
  passwordChangeError: null,
};

/**
 * Slice Redux - Authentification
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Déconnexion de l'utilisateur
     * @param {AuthState} state
     */
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.isAuthenticated = false;
      clearToken();
    },
    /**
     * Mise à jour du statut d'authentification
     * @param {AuthState} state
     * @param {Object} action
     */
    setAuth: (state, action) => {
      state.isAuthenticated = !!action.payload;
    },
    /**
     * Mise à jour des données utilisateur
     * @param {AuthState} state
     * @param {Object} action
     */
    setUser: (state, action) => {
      state.user = action.payload;
    },
    /**
     * Mise à jour de l'identifiant utilisateur
     * @param {AuthState} state
     * @param {Object} action
     */
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        return initialState;
      })
      // Inscription réussie
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const decoded = jwtDecode(token);
        state.userId = decoded.jti;
        state.user = action.payload;
        state.isAuthenticated = true;
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
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null; //suppression des messages d'error persistants
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

      //changement de mot de passe depuis profile
      .addCase(changeUserPassword.pending, (state) => {
        state.passwordChangeLoading = true;
        state.passwordChangeError = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.passwordChangeLoading = false;
        // déconnecter user pour forcer le login après changement ?
        // dispatchEvent(logout)
        clearToken();
        state.isAuthenticated = false;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.passwordChangeLoading = false;
        state.passwordChangeError = action.payload;
      });
  },
});

export const { logout, setAuth, setUser, setUserId } = authSlice.actions;
export default authSlice.reducer;
