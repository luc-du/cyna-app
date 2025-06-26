import { getApiUrl } from "../components/utils/api";

const AUTH_HOST = import.meta.env.VITE_API_HOST_AUTH;
const SUBSCRIPTION_HOST = import.meta.env.VITE_API_HOST_SUBSCRIPTION;
const PRODUCTS_HOST = import.meta.env.VITE_API_HOST_PRODUCTS;
const CATEGORIES_HOST = import.meta.env.VITE_API_HOST_CATEGORIES;
const CAROUSEL_HOST = import.meta.env.VITE_API_HOST_CAROUSEL;

export const API_ROUTES = {
  // AUTHENTIFICATION
  AUTH: {
    SIGNIN: getApiUrl(AUTH_HOST, "/auth/signin"),
    SIGNUP: getApiUrl(AUTH_HOST, "/auth/signup"),
    VALIDATE: getApiUrl(AUTH_HOST, "/auth/validate"),
    VERIFY_EMAIL: (email) =>
      getApiUrl(
        AUTH_HOST,
        `/auth/verify-email?email=${encodeURIComponent(email)}`
      ),
    //optionnel dans mon frontend
    VALIDATE_EMAIL: (email) =>
      getApiUrl(
        AUTH_HOST,
        `/auth/validate-email?email=${encodeURIComponent(email)}`
      ),
    //optionnel dans mon frontend
    VALIDATE_ACCOUNT: (email) =>
      getApiUrl(
        AUTH_HOST,
        `/auth/validate-account?email=${encodeURIComponent(email)}`
      ),
    PASSWORD_FORGOT_BY_ID: (userId) =>
      getApiUrl(AUTH_HOST, `/auth/password-forgot/${userId}`),

    PASSWORD_FORGOT: (email) =>
      getApiUrl(
        AUTH_HOST,
        `/auth/password-forgot?email=${encodeURIComponent(email)}`
      ),
    CHANGE_PASSWORD: () => getApiUrl(AUTH_HOST, "/auth/change-password"),
    RESET_PASSWORD: (email) =>
      getApiUrl(
        AUTH_HOST,
        `/auth/password-forgot?email=${encodeURIComponent(email)}`
      ),
  },

  //  UTILISATEUR
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

  //  ADRESSE
  ADDRESS: {
    GET_BY_USER: (userId) => getApiUrl(AUTH_HOST, `/address/user/${userId}`),
    ALL: getApiUrl(AUTH_HOST, "/address"),
    CREATE: getApiUrl(AUTH_HOST, "/address"),
    BY_ID: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
    PATCH: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
    DELETE: (id) => getApiUrl(AUTH_HOST, `/address/${id}`),
  },

  //  SUBSCRIPTIONS / STRIPE
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
      getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/${subscriptionId}`),
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

  //  PAYMENT METHODS
  PAYMENT_METHODS: {
    GET_ALL: (customerId) =>
      getApiUrl(
        SUBSCRIPTION_HOST,
        `/subscriptions/payment-methods?customerId=${encodeURIComponent(
          customerId
        )}`
      ),
    CREATE: getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/payment-method`),
    DELETE: (id) =>
      getApiUrl(SUBSCRIPTION_HOST, `/subscriptions/payment-methods/${id}`),
    SET_DEFAULT: ({ id, customerId }) =>
      getApiUrl(
        SUBSCRIPTION_HOST,
        `/subscriptions/payment-methods/${encodeURIComponent(
          id
        )}/default?customerId=${encodeURIComponent(customerId)}`
      ),
  },
  //  CATEGORIES
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

  //  PRODUITS
  PRODUCTS: {
    ALL: getApiUrl(PRODUCTS_HOST, "/products"),
    ALLWithPagination: getApiUrl(PRODUCTS_HOST, "/products"),
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

  //  CAROUSEL
  CAROUSEL: {
    ALL: (limits = 10) =>
      getApiUrl(CAROUSEL_HOST, `/carousel?limits=${limits}`),
    CREATE: getApiUrl(CAROUSEL_HOST, "/carousel"),
    UPDATE: getApiUrl(CAROUSEL_HOST, "/carousel"),
    DELETE: (id) => getApiUrl(CAROUSEL_HOST, `/carousel/${id}`),
    BY_ID: (id) => getApiUrl(CAROUSEL_HOST, `/carousel/${id}`),
  },
};
