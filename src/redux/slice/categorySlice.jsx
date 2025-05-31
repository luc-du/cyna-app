import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_Categories } from "../../mock/MOCKS_DATA";

// Constantes
const CATEGORY_API_BASE_URL = "/api/v1/categories";

/**
 * Récupère toutes les catégories depuis l'API.
 * Utilise un fallback sur les données mockées en cas d'échec.
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.CATEGORIES.GET, {});
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("fetchCategories error response:", error.response);
        if (error.response.data && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
        // Fallback sur les données mockées en cas d'erreur API
        console.warn(
          "Fallback sur MOCK_Categories suite à une erreur :",
          error.message
        );
        return rejectWithValue(MOCK_Categories);
      }
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

/**
 * Recherche des catégories par nom.
 * Si le terme de recherche est trop court, filtre côté client.
 * Sinon, utilise l'endpoint de recherche de l'API.
 */
export const searchCategories = createAsyncThunk(
  "categories/searchCategories",
  async (name, { rejectWithValue, dispatch }) => {
    try {
      // Si le terme de recherche est trop court, filtrage côté client
      if (name.length < 3) {
        console.log("Search term too short, filtering categories client-side");
        const allCategories = await dispatch(fetchCategories()).unwrap();

        // Filtrage des catégories côté frontend
        const searchTerm = name.toLowerCase();
        return Array.isArray(allCategories)
          ? allCategories.filter(
              (category) =>
                (category.name &&
                  category.name.toLowerCase().includes(searchTerm)) ||
                (category.description &&
                  category.description.toLowerCase().includes(searchTerm))
            )
          : [];
      }

      // Utilisation de l'endpoint de recherche si le terme est assez long
      const response = await fetch(
        `${CATEGORY_API_BASE_URL}/search?name=${encodeURIComponent(name)}`
        // {
        //   headers: getAuthHeaders(),
        // }
      );

      if (!response.ok) {
        console.warn(
          `Category search endpoint returned ${response.status}: ${response.statusText}`
        );

        // Fallback sur le filtrage côté client
        const allCategories = await dispatch(fetchCategories()).unwrap();
        const searchTerm = name.toLowerCase();

        return Array.isArray(allCategories)
          ? allCategories.filter(
              (category) =>
                (category.name &&
                  category.name.toLowerCase().includes(searchTerm)) ||
                (category.description &&
                  category.description.toLowerCase().includes(searchTerm))
            )
          : [];
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Search category error:", error);
      // Retourne un tableau vide pour éviter les erreurs UI
      return [];
    }
  }
);

/**
 * Crée une nouvelle catégorie via l'API.
 * Nécessite un token d'authentification.
 */
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch("/api/v1/categories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: categoryData,
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      return await response.text();
    } catch (error) {
      if (error.message === "No token found") {
        return rejectWithValue("Token manquant, veuillez vous reconnecter.");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create category"
      );
    }
  }
);

/**
 * Met à jour une catégorie existante via l'API.
 * Nécessite un token d'authentification.
 */
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // S'assure que la description est bien incluse dans formData

      const response = await fetch(`/api/v1/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        // Récupère un message d'erreur détaillé si possible
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update category");
      }

      return await response.text();
    } catch (error) {
      if (error.message === "No token found") {
        return rejectWithValue("Token manquant, veuillez vous reconnecter.");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update category"
      );
    }
  }
);

/**
 * Supprime une catégorie via l'API.
 */
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${CATEGORY_API_BASE_URL}/${id}`, {});
      return id;
    } catch (error) {
      if (error.message === "No token found") {
        return rejectWithValue("Token manquant, veuillez vous reconnecter.");
      }
      return rejectWithValue("Failed to delete category");
    }
  }
);

/**
 * Supprime plusieurs catégories via l'API.
 */
export const deleteMultipleCategories = createAsyncThunk(
  "categories/deleteMultiple",
  async (ids, { rejectWithValue }) => {
    try {
      await Promise.all(
        ids.map((id) => axios.delete(`${CATEGORY_API_BASE_URL}/${id}`, {}))
      );
      return ids;
    } catch (error) {
      if (error.message === "No token found") {
        return rejectWithValue("Token manquant, veuillez vous reconnecter.");
      }
      return rejectWithValue("Failed to delete categories");
    }
  }
);

/**
 * Récupère les détails d'une catégorie spécifique via l'API.
 */
export const fetchCategoryDetails = createAsyncThunk(
  "categories/fetchDetails",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_ROUTES.CATEGORIES.GET_BY_ID(categoryId),
        {}
      );
      return response.data;
    } catch (error) {
      if (error.message === "No token found") {
        return rejectWithValue("Token manquant, veuillez vous reconnecter.");
      }
      return rejectWithValue("Failed to fetch category details");
    }
  }
);

/**
 * Récupère tous les produits via l'API.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/products");
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Échec de la récupération des produits");
    }
  }
);

// Slice Redux Toolkit pour la gestion des catégories
/**
 * Ce slice gère l'état des catégories, y compris le chargement, les erreurs,
 * la récupération, la recherche, la création, la mise à jour et la suppression de catégories.
 *
 * Structure de l'état initial :
 * - categories : Tableau des catégories.
 * - loading : Booléen indiquant si une opération est en cours.
 * - error : Message d'erreur éventuel.
 *
 * ExtraReducers :
 * - fetchCategories : Gère la récupération de toutes les catégories.
 * - searchCategories : Gère la recherche de catégories selon un critère.
 * - createCategory : Déclenche le rechargement des catégories après création.
 * - updateCategory : Déclenche le rechargement des catégories après mise à jour.
 * - deleteCategory : Supprime une catégorie de la liste.
 * - deleteMultipleCategories : Supprime plusieurs catégories de la liste.
 * - fetchCategoryDetails : Met à jour une catégorie avec ses détails.
 *
 * @module categorySlice
 */
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de la récupération de toutes les catégories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories = action.payload || [];
        state.loading = false;
        state.error = "Échec API, fallback mock utilisé.";
      })
      // Gestion de la recherche de catégories
      .addCase(searchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
        state.categories = [];
      })
      // Après création, déclenche le rechargement des catégories
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = true;
      })
      // Après mise à jour, déclenche le rechargement des catégories
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = true;
      })
      // Suppression d'une catégorie de la liste
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      // Suppression de plusieurs catégories de la liste
      .addCase(deleteMultipleCategories.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => !action.payload.includes(category.id)
        );
      })
      // Mise à jour d'une catégorie avec ses détails
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

// Export du reducer pour intégration dans le store Redux
export const categoryReducer = categorySlice.reducer;
