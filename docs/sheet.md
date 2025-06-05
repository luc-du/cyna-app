Intitulé du post: SPRT05.04/feature/search

Objectifs:

- Révision de la navBar/ que faire pour la feature recherche
- implémenter la feature search priorité au be et fallback en MOCK (logique à implémenter dans le slice pour plus de praticité à retirer par la suite)
- icone pour redirection vers la page search? voir CDC

- cf documents ci-joints au projet
- se référer au CDC du projet
- appliquer les bonnes pratiques
- commenter de manière naturelle niveau développeur intermédiaire
- documentation JS sans excès
- respecter le style
- mise en place d'un fallback navigate en cas de recherche infructueuse
- franciliser les messages d'erreur- proptypes si nécessaire
- mise en place de l'accessibilité

---

# Codes:

import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slice/addressSlice";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/cartSlice";
import categoryReducer from "../slice/categorySlice";
import productReducer from "../slice/productSlice";
import searchReducer from "../slice/searchSlice";
import { topProductsReducer } from "../slice/topProductsSlice";

const store = configureStore({
reducer: {
cart: cartReducer,
auth: authReducer,
address: addressReducer,
categories: categoryReducer,
products: productReducer,
topProducts: topProductsReducer,
search: searchReducer,
},
});

export default store;

---

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_CATEGORIES } from "../../mock/MOCKS_DATA";

// ─── Async Thunks ─────────────────────────────────────────────

/\*\*

- Récupère toutes les catégories.
- Fallback MOCK*CATEGORIES en cas d'erreur serveur.
  \*/
  export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (*, { rejectWithValue }) => {
  try {
  const response = await axios.get(API_ROUTES.CATEGORIES.ALL);
  const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          return rejectWithValue(MOCK_CATEGORIES);
        }

        return data;
      } catch (error) {
        if (error.response?.data?.message) {
          return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue(MOCK_CATEGORIES);
      }

  }
  );

/\*\*

- Recherche une ou plusieurs catégories.
- Fallback locale si le backend retourne une liste vide.
  \*/
  export const searchCategories = createAsyncThunk(
  "categories/search",
  async (name, { rejectWithValue }) => {
  try {
  const response = await axios.get(API_ROUTES.CATEGORIES.SEARCH(name));
  const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          const fallback = MOCK_CATEGORIES.filter((cat) =>
            cat.name.toLowerCase().includes(name.toLowerCase())
          );
          return fallback;
        }

        return data || MOCK_CATEGORIES;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message ||
            "Erreur lors de la recherche de catégories"
        );
      }

  }
  );

/\*\*

- Récupère une catégorie par ID.
  \*/
  export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (categoryId, { rejectWithValue }) => {
  try {
  const res = await axios.get(API_ROUTES.CATEGORIES.BY_ID(categoryId));
  return res.data;
  } catch (err) {
  if (err.response?.data?.message) {
  return rejectWithValue(err.response.data.message);
  }
  return rejectWithValue("Impossible de récupérer cette catégorie.");
  }
  }
  );

// ─── Slice ───────────────────────────────────────────────────

const categorySlice = createSlice({
name: "categories",
initialState: {
list: [],
loading: false,
error: null,

    searchResults: [],
    loadingSearch: false,
    errorSearch: null,
    isSearchMode: false,

    selectedCategory: null,
    loadingSelected: false,
    errorSelected: null,

},
reducers: {
clearSearchResults: (state) => {
state.searchResults = [];
state.errorSearch = null;
state.isSearchMode = false;
},
},
extraReducers: (builder) => {
builder

      // ─── fetchCategories ─────────────────────────────────────────────
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        // 🎯 Cas du fallback mock : l'erreur contient un tableau de catégories
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.error = "Fallback mock appliqué (serveur vide ou erreur)";
        } else {
          state.list = [];
          state.error =
            action.payload ||
            "Erreur inconnue lors du chargement des catégories";
        }
      })

      // ─── fetchCategoryById ───────────────────────────────────────────
      .addCase(fetchCategoryById.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
        state.selectedCategory = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload || "Erreur lors du chargement.";
        state.selectedCategory = null;
      })

      // ─── searchCategories ───────────────────────────────────────────
      .addCase(searchCategories.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
        state.isSearchMode = true;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload;
        state.isSearchMode = true;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = [];
        state.errorSearch = action.payload;
        state.isSearchMode = true;
      });

},
});

export const { clearSearchResults } = categorySlice.actions;
export default categorySlice.reducer;

---

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";
import { processProductData } from "../../components/utils/productUtils";
import { MOCK_TOP_PRODUCTS } from "../../mock/MOCKS_DATA";

/\*\*

- Récupère la liste complète des produits depuis l'API.
- Si l'appel échoue, on rejette avec un tableau fallback (MOCK*TOP_PRODUCTS).
  \*/
  export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (*, { rejectWithValue }) => {
  try {
  const response = await axios.get(API_ROUTES.PRODUCTS.ALL());
  if (!Array.isArray(response.data) || response.data.length === 0) {
  return rejectWithValue(MOCK_TOP_PRODUCTS);
  }
  return response.data;
  } catch (error) {
  if (error.response?.data?.message) {
  return rejectWithValue(error.response.data.message);
  }
  return rejectWithValue(MOCK_TOP_PRODUCTS);
  }
  }
  );

/\*\*

- Récupère un produit unique depuis l'API à partir de son productId.
- Si l'appel échoue, on rejette avec un message d'erreur.
  \*/
  export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, { rejectWithValue }) => {
  try {
  const id = Number(productId);
  if (isNaN(id)) {
  return rejectWithValue("ID produit invalide");
  }
  const response = await axios.get(API_ROUTES.PRODUCTS.BY_ID(id));
  console.log("url fetchProductByID", API_ROUTES.PRODUCTS.BY_ID(id));

        return processProductData(response.data);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 400 || status === 404) {
          return rejectWithValue("Produit introuvable ou requête invalide");
        }
        return rejectWithValue("Erreur serveur");
      }

  }
  );

/\*

- Recherche de produits par mot-clé.
- Si l'appel échoue, on rejette avec un tableau fallback (MOCK_TOP_PRODUCTS).
- On utilise un paramètre `page` pour la pagination.
  \*/
  export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ keyword = "", page = 0, size = 6 }, { rejectWithValue }) => {
  try {
  const response = await axios.get(
  API_ROUTES.PRODUCTS.SEARCH({ keyword, page, size })
  );
  if (!response.data || !Array.isArray(response.data.products)) {
  return rejectWithValue(MOCK_TOP_PRODUCTS); // fallback mock
  }

        return response.data.products.map(processProductData); // nettoyage
      } catch (err) {
        if (err.response?.data?.message) {
          return rejectWithValue(err.response.data.message);
        }
        return rejectWithValue(MOCK_TOP_PRODUCTS);
      }

  }
  );

const productSlice = createSlice({
name: "product",
initialState: {
// Détail d’un produit unique
item: null,
loadingItem: false,
errorItem: null,

    // Liste complète des produits
    list: [],
    loadingList: false,
    errorList: null,

    // Recherche de produits
    searchResults: [],
    loadingSearch: false,
    errorSearch: null,
    isSearchMode: false,
    // Pagination des résultats de recherche
    currentPage: 1,
    totalPages: 1,

},
reducers: {},
extraReducers: (builder) => {
// ---------- fetchProducts (liste de produits) ----------
builder
.addCase(fetchProducts.pending, (state) => {
state.loadingList = true;
state.errorList = null;
state.list = [];
})
.addCase(fetchProducts.fulfilled, (state, action) => {
state.loadingList = false;
state.list = action.payload;
})
.addCase(fetchProducts.rejected, (state, action) => {
state.loadingList = false;
// Si action.payload est un tableau (fallback mock), on l’utilise
if (Array.isArray(action.payload)) {
state.list = action.payload;
state.errorList =
"Fallback mock appliqué pour la liste des produits.";
} else {
state.list = [];
state.errorList =
action.payload || "Erreur inconnue lors du fetchProducts";
}
});

    // ---------- fetchProductById (détail d’un produit) ----------
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.item = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.item = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || "Erreur inconnue";
        state.item = null;
      });

    // ---------- searchProducts (recherche de produits) ----------
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingList = false;
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.errorList = "Fallback mock utilisé (search)";
        } else {
          state.list = [];
          state.errorList =
            action.payload || "Erreur inconnue dans searchProducts";
        }
      });

},
});

export default productSlice.reducer;

---

import { getApiUrl } from "../components/utils/api";

const AUTH_HOST = import.meta.env.VITE_API_HOST_AUTH;
const SUBSCRIPTION_HOST = import.meta.env.VITE_API_HOST_SUBSCRIPTION;
const PRODUCTS_HOST = import.meta.env.VITE_API_HOST_PRODUCTS;
const CATEGORIES_HOST = import.meta.env.VITE_API_HOST_CATEGORIES;
const CAROUSEL_HOST = import.meta.env.VITE_API_HOST_CAROUSEL;

export const API_ROUTES = {
// ─── AUTHENTIFICATION ─────────────────────────────────────────────────────
AUTH: {
SIGNIN: getApiUrl(AUTH_HOST, "/auth/signin"),
SIGNUP: getApiUrl(AUTH_HOST, "/auth/signup"),
VALIDATE: getApiUrl(AUTH_HOST, "/auth/validate"),
VERIFY_EMAIL: (email) =>
getApiUrl(
AUTH_HOST,
`/auth/verify-email?email=${encodeURIComponent(email)}`
),
VALIDATE_EMAIL: (email) =>
getApiUrl(
AUTH_HOST,
`/auth/validate-email?email=${encodeURIComponent(email)}`
),
VALIDATE_ACCOUNT: (email) =>
getApiUrl(
AUTH_HOST,
`/auth/validate-account?email=${encodeURIComponent(email)}`
),
PASSWORD_FORGOT_BY_ID: (userId) =>
getApiUrl(AUTH_HOST, `/auth/password-forgot/${userId}`),
PASSWORD_FORGOT_BY_EMAIL: (email) =>
getApiUrl(
AUTH_HOST,
`/auth/password-forgot?email=${encodeURIComponent(email)}`
),
},

// ─── UTILISATEUR ───────────────────────────────────────────────────────────
USER: {
BY_ID: (id) => getApiUrl(AUTH_HOST, `/user/${id}`),
ALL: getApiUrl(AUTH_HOST, "/user"),
SEARCH: (name) =>
getApiUrl(AUTH_HOST, `/user/search?name=${encodeURIComponent(name)}`),
DELETE: (id) => getApiUrl(AUTH_HOST, `/user/${id}`),
PATCH: (id) => getApiUrl(AUTH_HOST, `/user/${id}`),
UPDATE_PASSWORD: (id) => getApiUrl(AUTH_HOST, `/user/${id}/password`),
UPLOAD_PROFILE: (id) => getApiUrl(AUTH_HOST, `/user/${id}/profiles`),
},

// ─── ADRESSE ───────────────────────────────────────────────────────────────
ADDRESS: {
ALL: getApiUrl(AUTH_HOST, "/address"),
CREATE: getApiUrl(AUTH_HOST, "/address"),
BY_ID: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
PATCH: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
DELETE: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
},

// ─── SUBSCRIPTIONS / STRIPE ─────────────────────────────────────────────────
SUBSCRIPTION: {
CREATE_CUSTOMER: getApiUrl(
SUBSCRIPTION_HOST,
"/subscriptions/create-customer"
),
CREATE_PRICE: getApiUrl(SUBSCRIPTION_HOST, "/subscriptions/create-price"),
CREATE_SUBSCRIPTION: getApiUrl(
SUBSCRIPTION_HOST,
"/subscriptions/create-subscription"
),
CANCEL_SUBSCRIPTION: getApiUrl(
SUBSCRIPTION_HOST,
"/subscriptions/subscription/cancel"
),
UPDATE_SUBSCRIPTION: (subscriptionId) =>
getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/subscriptionId`),
GET_BY_CUSTOMER: (customerId) =>
getApiUrl(
SUBSCRIPTION_HOST,
`/subscriptions?customerId=${encodeURIComponent(customerId)}`
),
GET_BY_ID: (id) => getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/${id}`),
DELETE_SUBSCRIPTION: (id) =>
getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/${id}`),
EPHEMERAL_KEY: (customerId) =>
getApiUrl(
SUBSCRIPTION_HOST,
`/subscriptions/${encodeURIComponent(customerId)}/ephemeral-key`
),
CUSTOMER_PORTAL: (customerId) =>
getApiUrl(
SUBSCRIPTION_HOST,
`/subscriptions/${encodeURIComponent(customerId)}/customer-portal`
),
GET_TOP_PRODUCTS: (top) =>
getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/top-products?top=${top}`),
WEBHOOK: getApiUrl(SUBSCRIPTION_HOST, "/subscriptions/webhook"),
CONFIG: getApiUrl(SUBSCRIPTION_HOST, "/subscriptions/config"),
},

// ─── CATEGORIES ─────────────────────────────────────────────────────────────
CATEGORIES: {
ALL: getApiUrl(CATEGORIES_HOST, "/categories"),
BY_ID: (id) => getApiUrl(CATEGORIES_HOST, `/categories/${id}`),
CREATE: getApiUrl(CATEGORIES_HOST, "/categories"),
UPDATE: (id, name) =>
getApiUrl(
CATEGORIES_HOST,
`/categories/${id}?name=${encodeURIComponent(name)}`
),
DELETE: (id) => getApiUrl(CATEGORIES_HOST, `/categories/${id}`),
SEARCH: (name) =>
getApiUrl(
CATEGORIES_HOST,
`/categories/search?name=${encodeURIComponent(name)}`
),
//GESTION DES IMAGES POUR UNE CATEGORIE
ADD_IMAGES: (categoryId) =>
getApiUrl(CATEGORIES_HOST, `/categories/${categoryId}/images`),
DELETE_IMAGES: (categoryId) =>
getApiUrl(CATEGORIES_HOST, `/categories/${categoryId}/images`),
},

// ─── PRODUITS ───────────────────────────────────────────────────────────────
PRODUCTS: {
ALL: getApiUrl(PRODUCTS_HOST, "/products"),
PAGINATION: ({
page = 0,
size = 6,
categoriesIds = [],
promoOnly = false,
sort = "desc",
} = {}) => {
const params = new URLSearchParams();
params.set("page", page);
params.set("size", size);
if (categoriesIds.length) {
categoriesIds.forEach((id) => params.append("categoriesIds", id));
}
if (promoOnly) {
params.set("promoOnly", promoOnly);
}
if (sort) {
params.set("sort", sort);
}
return getApiUrl(
PRODUCTS_HOST,
`/products/pagination?${params.toString()}`
);
},
SEARCH: ({ keyword = "", page = 0, size = 6 } = {}) => {
const params = new URLSearchParams();
if (keyword) params.set("keyword", keyword);
params.set("page", page);
params.set("size", size);
return getApiUrl(PRODUCTS_HOST, `/products/search?${params.toString()}`);
},
BY_ID: (productId) => getApiUrl(PRODUCTS_HOST, `/products/${productId}`),
CREATE: getApiUrl(PRODUCTS_HOST, "/products"),
UPDATE: (productId) => getApiUrl(PRODUCTS_HOST, `/products/${productId}`),
DELETE: (productId) => getApiUrl(PRODUCTS_HOST, `/products/${productId}`),
GET_TOP_PRODUCTS: ({ top = 10, promo = true, active = true } = {}) => {
const params = new URLSearchParams();
params.set("top", top);
if (promo !== undefined) params.set("promo", promo);
if (active !== undefined) params.set("active", active);
return getApiUrl(
PRODUCTS_HOST,
`/products/top-products?${params.toString()}`
);
},
// GESTION DES IMAGES D’UN PRODUIT
ADD_IMAGES: (productId) =>
getApiUrl(PRODUCTS_HOST, `/products/${productId}/images`), // PATCH attend tableau d’IDs en query/body
DELETE_IMAGES: (productId) =>
getApiUrl(PRODUCTS_HOST, `/products/${productId}/images`),
},

// ─── CAROUSEL ───────────────────────────────────────────────────────────────
CAROUSEL: {
ALL: (limits = 10) =>
getApiUrl(CAROUSEL_HOST, `/carousel?limits=${limits}`),
CREATE: getApiUrl(CAROUSEL_HOST, "/carousel"),
UPDATE: getApiUrl(CAROUSEL_HOST, "/carousel"),
DELETE: (id) => getApiUrl(CAROUSEL_HOST, `/carousel/${id}`),
BY_ID: (id) => getApiUrl(CAROUSEL_HOST, `/carousel/${id}`),
},
};

---

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearSearch, setQuery } from "../../redux/slice/searchSlice";

const DEBOUNCE_DELAY = 300;

export default function SearchBar() {
const [inputValue, setInputValue] = useState("");
const dispatch = useDispatch();
const location = useLocation();
const navigate = useNavigate();

// Met à jour la recherche avec debounce
useEffect(() => {
const timer = setTimeout(() => {
const trimmed = inputValue.trim();

      if (trimmed !== "") {
        dispatch(setQuery(trimmed));

        // Ne redirige que si on n’est pas déjà sur la page de résultats
        if (location.pathname !== "/search") {
          navigate("/search");
        }
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);

}, [inputValue, dispatch, navigate, location]);

// Réinitialise la recherche si on quitte la page /search
useEffect(() => {
if (location.pathname !== "/search") {
setInputValue(""); // vide le champ visuel
dispatch(clearSearch()); // vide le store Redux
}
}, [location.pathname, dispatch]);

return (
<input
type="text"
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
placeholder="Rechercher un produit ou service..."
className="hidden lg:block w-40 px-3 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
aria-label="Champ de recherche de produit"
/>
);
}

---

certainement à revoir:
// Feature : Recherche locale de produits en fallback du backend
// Justification : La route `/products/search` retourne une erreur SQL car le FULLTEXT index est absent.
// Cette solution temporaire permet d’assurer une recherche fluide sans patch backend, pour respecter les délais de soutenance.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

export const fetchAllProducts = createAsyncThunk(
"search/fetchAllProducts",
async () => {
const response = await axios.get(API_ROUTES.PRODUCTS.GET);
return response.data;
}
);

const initialState = {
allProducts: [],
filtered: [],
status: "idle", // idle | loading | succeeded | failed
error: null,
query: "",
};

/\*\*

- Slice Redux pour la gestion de la recherche de produits.
-
- @namespace search
- @property {Object} initialState - L'état initial du slice, incluant la requête de recherche, la liste des produits filtrés, etc.
- @property {Function} setQuery - Action pour mettre à jour la requête de recherche et filtrer les produits correspondants.
- @property {Function} clearSearch - Action pour réinitialiser la recherche et vider les résultats filtrés.
- @property {Function} extraReducers - Gère les états asynchrones liés à la récupération de tous les produits (chargement, succès, échec).
-
- @example
- dispatch(setQuery('ordinateur'));
- dispatch(clearSearch());
  \*/
  const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
  setQuery: (state, action) => {
  const query = action.payload.toLowerCase();
  state.query = query;
  state.filtered = state.allProducts.filter((product) =>
  `${product.name} ${product.description} ${product.caracteristics}`
  .toLowerCase()
  .includes(query)
  );
  },

      clearSearch: (state) => {
        // Reset complet lors d’un changement de page (cf. SearchBar)
        state.query = "";
        state.filtered = [];
      },

  },
  extraReducers: (builder) => {
  builder
  .addCase(fetchAllProducts.pending, (state) => {
  state.status = "loading";
  })
  .addCase(fetchAllProducts.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.allProducts = action.payload;
  })
  .addCase(fetchAllProducts.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
  });
  },
  });

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

---

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ProductCard from "../components/Home/ProductCard";
import EmptyState from "../components/ui/EmptyState";
import Loader from "../components/ui/Loader";

export default function SearchPage() {
const { query, filtered, status, error } = useSelector(
(state) => state.search
);

if (status === "loading")
return <Loader aria-label="Chargement des résultats" />;

if (error) {
return (

<div
        className="text-center mt-10 text-red-600"
        role="alert"
        aria-live="assertive"
      >
Une erreur est survenue lors du chargement des produits.
</div>
);
}

return (

<main
      className="container mx-auto px-4 py-8"
      aria-labelledby="search-results-heading"
    >
<h2
        id="search-results-heading"
        className="text-2xl font-bold mb-4"
        tabIndex={-1}
      >
Résultats pour : « {query} »
</h2>

      {filtered.length === 0 && query.trim() !== "" ? (
        <EmptyState message="Aucun produit ne correspond à votre recherche." />
      ) : (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Liste des produits"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>

);
}

ProductCard.propTypes = {
product: PropTypes.shape({
id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}).isRequired,
};

EmptyState.propTypes = {
message: PropTypes.string.isRequired,
};

---

import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import { setQuery } from "../../../redux/slice/searchSlice";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

/\*\*

- Composant Navbar
-
- Affiche la barre de navigation principale de l'application, incluant :
- - Le logo de l'application
- - Les liens de navigation pour la version desktop
- - Une barre de recherche (desktop et mobile)
- - Un badge de panier
- - Un menu mobile avec overlay de recherche
-
- Fonctionnalités :
- - Permet la recherche de produits ou services via une barre de recherche.
- - Affiche un overlay de recherche optimisé pour mobile.
- - Gère la navigation vers la page de résultats de recherche.
- - Utilise Redux pour dispatcher la requête de recherche.
-
- @component
- @returns {JSX.Element} Élément JSX représentant la barre de navigation.
  \*/
  export default function Navbar() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [mobileInput, setMobileInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSearch = (value) => {
setMobileInput(value);
dispatch(setQuery(value.trim()));
if (value.trim() !== "") navigate("/search");
};

const closeOverlay = () => {
setMobileInput("");
setShowSearchOverlay(false);
};

return (
<>
{/_ Logo _/}

<Link to="/" className="flex-shrink-0" aria-label="Accueil Cyna">
<img src={logo} alt="Cyna Logo" className="w-40 sm:w-40" />
</Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden lg:flex items-center space-x-4"
        aria-label="Navigation principale"
      >
        <NavbarLinks />
        <SearchBar />
      </nav>

      {/* Cart Badge */}
      <div className="flex items-center space-x-4" aria-label="Panier">
        <CartBadge />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center space-x-4">
        <button
          className="text-white text-xl p-2"
          onClick={() => setShowSearchOverlay(true)}
          aria-label="Ouvrir la recherche"
          aria-haspopup="dialog"
          aria-controls="mobile-search-overlay"
        >
          <FaSearch />
        </button>
        <MobileMenu />
      </div>

      {/* Overlay de recherche mobile */}
      {showSearchOverlay && (
        <div
          id="mobile-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche mobile"
          className="fixed inset-0 z-50 bg-white/70 backdrop-blur-md flex flex-col justify-center items-center px-6"
        >
          <style>{`body { overflow: hidden; }`}</style>

          <button
            onClick={closeOverlay}
            className="absolute top-6 right-4 text-primary text-3xl p-2 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Fermer la recherche"
          >
            <FaTimes />
          </button>

          <div className="w-full max-w-md">
            <label htmlFor="mobile-search-input" className="sr-only">
              Rechercher un produit ou service
            </label>
            <input
              id="mobile-search-input"
              type="text"
              value={mobileInput}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher un produit ou service..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              role="searchbox"
              aria-label="Rechercher un produit ou service"
            />
          </div>
        </div>
      )}
    </>

);
}
