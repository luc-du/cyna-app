Objectifs:

- contrôle, refacto si nécessaire du flow Categories > categories/id - products > products/id et consommation des routes dites défintives cf swagger document projet
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
  // Si la réponse est vide, on considère un fallback mock
  if (!Array.isArray(response.data) || response.data.length === 0) {
  // On rejette pour passer dans la logique de fallback
  return rejectWithValue(MOCK_TOP_PRODUCTS);
  }
  return response.data;
  } catch (error) {
  // S'il y a un message d'erreur venant du serveur, on le transmet
  if (error.response?.data?.message) {
  return rejectWithValue(error.response.data.message);
  }
  // Sinon, on rejette avec les mocks
  return rejectWithValue(MOCK_TOP_PRODUCTS);
  }
  }
  );

/\*\*

- Récupère un produit unique depuis l'API à partir de son productId.
- Si l'appel échoue, on rejette avec un message d'erreur.
  \*/
  export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { rejectWithValue }) => {
  try {
  const response = await axios.get(API_ROUTES.PRODUCTS.BY_ID(productId));
  return response.data;
  } catch (error) {
  if (error.response?.data?.message) {
  return rejectWithValue(error.response.data.message);
  }
  return rejectWithValue("Échec de la récupération du produit");
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

},
});

## export default productSlice.reducer;

// src/api/homeService.js
import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
/\*\*

- Récupère les éléments du carousel (héros).
- -> GET /carousel?limits=…
  _/
  export const fetchCarouselSlides = () => {
  return axios
  .get(API_ROUTES.CAROUSEL.ALL(/_ facultatif : nombre de slides \*/))
  .then((res) => res.data);
  };

/\*\*

- Récupère la liste des catégories à afficher (pour CategoriesGrid).
- -> GET /categories
  \*/
  export const fetchCategories = () => {
  return axios.get(API_ROUTES.CATEGORIES.ALL).then((res) => res.data);
  };

/\*\*

- Récupère les "Top Products du moment" (pour TopProductsGrid).
- -> GET /products/top-products?top=…
  \*/
  export const fetchTopProducts = (
  options = { top: 10, promo: true, active: true }
  ) => {
  const { top, promo, active } = options;
  return axios
  .get(API_ROUTES.PRODUCTS.GET_TOP_PRODUCTS({ top, promo, active }))
  .then((res) => res.data);
  };

/\*\*

- Récupère les promotions (par exemple : produits en promo).
  _/
  export const fetchPromoProducts = (options = { page: 0, size: 6 }) => {
  const { page, size } = options;
  return axios
  .get(API_ROUTES.PRODUCTS.PAGINATION({ page, size, promoOnly: true }))
  .then((res) => res.data.products /_ selon le format Pagination \*/);
  };

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

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
return (

<Link
to={`/categories/${category.url}`}
className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
role="region"
aria-label={`Catégorie : ${category.name}`} >
<img
        src={category.imageUrl}
        alt={category.name}
        loading="lazy"
        className="w-full h-40 object-cover"
      />
<div className="p-4 text-center">
<h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
</div>
</Link>
);
};

CategoryCard.propTypes = {
category: PropTypes.shape({
url: PropTypes.string.isRequired,
imageUrl: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
}).isRequired,
};

export default CategoryCard;

---

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../ui/buttons/NavigateButton";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

const CategoryDetails = () => {
const navigate = useNavigate();
const { categoryId } = useParams();
const dispatch = useDispatch();

const category = useSelector((state) =>
state.categories.categories.find((cat) => cat.id === parseInt(categoryId))
);

useEffect(() => {
if (!category) {
// dispatch(fetchCategoryDetails(categoryId));
}
}, [categoryId, category, dispatch]);

if (!category) {
return <p className="text-center mt-10">Chargement de la catégorie...</p>;
}

return (

<div className="max-w-7xl w-full my-6 mx-auto p-4">
<NavigateButton
handleClick={() => navigate("/categories")}
label="⬅️Liste des catégories"
/>

      <CategoryHeader element={category}>
        <CategoryDescription element={category} />
      </CategoryHeader>

      <CategoryProductList element={category} />
    </div>

);
};

export default CategoryDetails;

---

import PropTypes from "prop-types";

const CategoryHeader = ({ element, children }) => {
console.log(element);

return (

<div className="text-center my-6">
<div className="relative">
<img
          src={element.images[0].url}
          alt={element.name}
          className="w-full max-h-96 object-cover rounded-lg shadow-md"
        />
<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
<h1 className="text-3xl font-bold text-white transition transform hover:scale-105 hover:shadow-2xl">
{element.name}
</h1>
</div>{" "}
</div>
{children}
</div>
);
};
CategoryHeader.propTypes = {
element: PropTypes.shape({
images: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
description: PropTypes.string.isRequired,
}).isRequired,
children: PropTypes.node,
};

export default CategoryHeader;

---

import PropTypes from "prop-types";

const CategoryDescription = ({ element }) => {
return (
<>
{" "}

<h2>Description du service</h2>
<p className="mt-2 text-gray-700">{element.description}</p>
</>
);
};
CategoryDescription.propTypes = {
element: PropTypes.shape({
description: PropTypes.string.isRequired,
}).isRequired,
};

export default CategoryDescription;

---

import PropTypes from "prop-types";
import { sortProductsByPriority } from "../utils/sortProductByPriority";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ element }) => {
const products = element.products || [];
const sortedProducts = sortProductsByPriority(products);

return (

<main className="mt-6">
<h2>Produits et Services</h2>
<section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
{sortedProducts.map((item) => (
<ProductCard item={item} key={item.id} />
))}
</section>
</main>
);
};

CategoryProductList.propTypes = {
element: PropTypes.shape({
products: PropTypes.array.isRequired,
}).isRequired,
};

export default CategoryProductList;

---

@ vérifier si encore utile pour la mock oui

export const sortProductsByPriority = (products) => {
return [...products].sort((a, b) => {
const priority = (p) => {
if (p.active && p.promo) return 0;
if (p.active) return 1;
return 2;
};

    return priority(a) - priority(b);

});
};
