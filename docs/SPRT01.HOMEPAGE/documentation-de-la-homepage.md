# Documentation de la HomePage

Cette documentation récapitule l’ensemble des modifications et des nouveaux composants créés pour la **HomePage** de l’application. Elle est destinée à faciliter la prise en main du collègue qui reprend ce refacto, en détaillant la structure, le fonctionnement, les slices Redux, les services appelés, et les points d’attention (accessibilité, fallback, etc.).

---

## Table des matières

- [Documentation de la HomePage](#documentation-de-la-homepage)
  - [Table des matières](#table-des-matières)
  - [1. Contexte et objectifs](#1-contexte-et-objectifs)
  - [2. Prérequis et installation](#2-prérequis-et-installation)
  - [3. Configuration du proxy Vite](#3-configuration-du-proxy-vite)
  - [4. Structure des dossiers et fichiers principaux](#4-structure-des-dossiers-et-fichiers-principaux)
  - [5. Routes API utilisées](#5-routes-api-utilisées)
  - [6. Slices Redux](#6-slices-redux)
    - [6.1. categorySlice](#61-categoryslice)
    - [6.2. topProductsSlice](#62-topproductsslice)
  - [7. Composants de la HomePage](#7-composants-de-la-homepage)
    - [7.1. Homepage](#71-homepage)
    - [7.2. Home](#72-home)
    - [7.3. HeroSection \& CarouselContainer](#73-herosection--carouselcontainer)
    - [7.4. CategoriesGrid \& CategoryCard](#74-categoriesgrid--categorycard)
    - [7.5. TopProductsGrid \& ProductCard](#75-topproductsgrid--productcard)
  - [8. Accessibilité et fallback](#8-accessibilité-et-fallback)
  - [9. Styling et dépendances](#9-styling-et-dépendances)
  - [10. Tests et vérifications](#10-tests-et-vérifications)
  - [11. Points d’amélioration possibles](#11-points-damélioration-possibles)
    - [Fin de la documentation](#fin-de-la-documentation)

---

## 1. Contexte et objectifs

L’objectif de ce refacto était de moderniser et d’industrialiser la **HomePage** de l’application :

- Intégrer un carrousel dynamique de “Featured Items” (HeroSection / CarouselContainer).
- Afficher la grille des catégories depuis le store Redux (CategoriesGrid / CategoryCard).
- Afficher la grille des “Top Produits” depuis le store Redux (TopProductsGrid / ProductCard).
- Gérer systématiquement les états de **loading**, **erreur** et **fallback** (images par défaut) pour chaque section.
- Garantir une expérience accessible (ARIA, alt, tabIndex, rôles appropriés).
- Valider la logique Redux (fetch + stockage en slice) et la consommation des endpoints exposés via `apiRoutes`.
- Conserver un code propre, découplé (chaque composant fait une seule chose) et documenté via PropTypes.

---

## 2. Prérequis et installation

1. **Node.js** (≥ 16.x)
2. **Yarn** ou **npm**
3. Avoir le backend Spring Boot démarré sur les ports définis (8081 pour auth/user, 8082 pour categories/products/carousel, 8083 pour Stripe si nécessaire).

```bash
# À la racine du projet frontend
npm install
# ou
yarn install

# Démarrer le mode développement
npm run dev
# ou
yarn dev
```

Les dépendances React/Redux à jour sont :

- `react` / `react-dom`
- `react-router-dom`
- `redux`, `@reduxjs/toolkit`, `react-redux`
- `axios`
- `prop-types`
- `tailwindcss` (pour les classes utilitaires)

---

## 3. Configuration du proxy Vite

Dans `vite.config.js` (ou `vite.config.ts`), on a configuré un proxy pour rediriger les appels `"/api/..."` vers le backend :

```js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api/v1/categories": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/carousel": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/products": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/auth": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/user": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

> **Remarque :**
>
> - Si un microservice tourne sur un port différent, ajustez la cible (`target`) en conséquence.

---

## 4. Structure des dossiers et fichiers principaux

```
src/
├── api/
│   └── apiRoutes.js            # Définit les constantes des endpoints
│
├── assets/
│   └── images/                 # Contient les placeholders (category, product, etc.)
│
├── components/
│   └── Home/
│       ├── Homepage.jsx        # Point d’entrée de la HomePage
│       ├── Home.jsx            # Conteneur principal (Hero + Categories + TopProducts)
│       ├── HeroSection.jsx     # Section “Hero” (carrousel)
│       ├── CarouselContainer.jsx # Chargement des slides + wrapping Carousel
│       ├── Carousel.jsx        # Composant de carrousel générique (fourni)
│       ├── CategoriesGrid.jsx   # Grille des catégories (Redux fetch + loading/error)
│       ├── CategoryCard.jsx     # Carte d’une catégorie
│       ├── TopProductsGrid.jsx  # Grille des top produits (Redux fetch + loading/error)
│       └── ProductCard.jsx      # Carte d’un produit en vedette
│
└── redux/
    └── slice/
        ├── categorySlice.js       # Slice pour `fetchCategories`
        ├── topProductsSlice.js    # Slice pour `fetchTopProducts`
        ├── productSlice.js        # Slice pour `fetchProductById`, `fetchProducts`
        └── (autres slices existants)
```

- **`api/apiRoutes.js`**
  Contient toutes les routes vers les microservices (auth, user, categories, carousel, products, etc.).

  Exemple :

  ```js
  const PROTOCOL = "http";
  const HOST = "localhost";
  const PORT_CATEGORIES = 8082;
  const PORT_PRODUCTS = 8082;
  const PORT_CAROUSEL = 8082;
  const API_BASE = "/api/v1";

  export const API_ROUTES = {
    CAROUSEL: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_CAROUSEL}${API_BASE}/carousel`,
      BY_ID: (id) =>
        `${PROTOCOL}://${HOST}:${PORT_CAROUSEL}${API_BASE}/carousel/${id}`,
    },
    CATEGORIES: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories`,
      BY_ID: (id) =>
        `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories/${id}`,
    },
    PRODUCTS: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_PRODUCTS}${API_BASE}/products`,
      BY_ID: (id) =>
        `${PROTOCOL}://${HOST}:${PORT_PRODUCTS}${API_BASE}/products/${id}`,
      // Pour récupérer les top produits :
      // `${API_ROUTES.PRODUCTS.ALL}/top-products?top=8&active=true&promo=true`
    },
    // …
  };
  ```

---

## 5. Routes API utilisées

- **Carrousel**

  - `GET /api/v1/carousel` → Tableau de slides `{ id, imageUrl, title, text, ctaText?, ctaLink? }`.

- **Catégories**

  - `GET /api/v1/categories` → Tableau de catégories `{ id, name, description, images: [ { id, name, url, uploadDate } ], products: [...] }`.

- **Top Produits**

  - `GET /api/v1/products/top-products?top=8&active=true&promo=true` → Tableau de `ProductGetDto` (inclut `id, name, amount, images: […], promo, active, …`).

- **Produits**

  - `GET /api/v1/products` → Liste complète des produits.
  - `GET /api/v1/products/{productId}` → Détails d’un produit `{ id, name, description, images: [ { url } ], specs: { … }, pricing: [ … ], etc. }`.

> **Attention**
>
> - Vérifiez que le microservice “categories/products/carousel” tourne sur le port configuré (8082).
> - Si un service est sur un autre port, ajustez le proxy ou les constantes dans `apiRoutes.js`.

---

## 6. Slices Redux

### 6.1. categorySlice

```js
// src/redux/slice/categorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// Thunk pour récupérer toutes les catégories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.CATEGORIES.ALL);
      // Si le backend renvoie un tableau vide, on renvoie ce tableau (pas de fallback ici)
      return response.data;
    } catch (error) {
      console.error("fetchCategories error:", error);
      // On rejette avec message d’erreur
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Données reçues ou mockées
    loading: false,
    error: null,
  },
  reducers: {
    // pas de reducers classiques
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
        // Si souhaité : fallback mock
        // state.categories = MOCK_CATEGORIES;
      });
  },
});

export default categorySlice.reducer;
```

- **États gérés** :

  - `loading` : devient `true` pendant l’appel API
  - `error` : message d’erreur s’il y en a une
  - `categories` : stocke le tableau de catégories à la réception des données

- **Fallback Mock** :

  - Présent en commentaire dans le `rejected` si l’on souhaite activer un fallback sur `MOCK_CATEGORIES`.

- **Usage** : Vu dans `CategoriesGrid.jsx`.

---

### 6.2. topProductsSlice

```js
// src/redux/slice/topProductsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

const MAX_TOP_PRODUCTS = 8;

export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Appel au backend pour récupérer les top produits
      const url = `${API_ROUTES.PRODUCTS.ALL}/top-products?top=${MAX_TOP_PRODUCTS}&active=true&promo=true`;
      const response = await axios.get(url);

      // On mappe chaque produit pour ne garder que les champs utiles à la HomePage
      const mapped = response.data.map((prod) => ({
        id: prod.id,
        name: prod.name,
        amount: prod.amount,
        promo: prod.promo,
        imageUrl:
          prod.images?.[0]?.url || "/assets/images/placeholder-product.jpg",
        link: `/products/${prod.id}`,
      }));

      return mapped;
    } catch (err) {
      console.warn("fetchTopProducts fallback:", err);
      // Optionnel : renvoyer mock ici, ou simplement rejeter et laisser fallback dans le composant
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const topProductsSlice = createSlice({
  name: "topProducts",
  initialState: {
    items: [], // Tableau des produits “en vedette”
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur inconnue";
        // Optionnel : fallback mock
        // state.items = MOCK_TOP_PRODUCTS;
      });
  },
});

export default topProductsSlice.reducer;
```

- **Route appelée** :

  - `GET /api/v1/products/top-products?top=8&active=true&promo=true`

- **États gérés** :

  - `items` : la liste formatée pour l’affichage
  - `loading`, `error`

- **Fallback Mock** :

  - Peut être activé dans le `rejected` si nécessaire (ligne commentée).

- **Usage** : Vu dans `TopProductsGrid.jsx`.

---

## 7. Composants de la HomePage

### 7.1. Homepage

```jsx
// src/components/Home/Homepage.jsx

import Home from "./Home";

const Homepage = () => {
  return <Home />;
};

export default Homepage;
```

- Wrapper très simple, utilisé dans le **Router** pour la route `/`.

---

### 7.2. Home

```jsx
// src/components/Home/Home.jsx

import HeroSection from "./HeroSection";
import CategoriesGrid from "./CategoriesGrid";
import TopProductsGrid from "./TopProductsGrid";

const Home = () => {
  return (
    <main
      id="homepageContent"
      className="max-w-6xl mx-auto my-4 px-4"
      tabIndex={-1}
      aria-label="Contenu principal de la page d'accueil"
    >
      {/* Section “Hero” avec le Carrousel */}
      <HeroSection />

      {/* Section Grille des Catégories */}
      <section aria-label="Catégories">
        <CategoriesGrid />
      </section>

      {/* Section Grille des Top Produits */}
      <section aria-label="Top Produits">
        <TopProductsGrid />
      </section>
    </main>
  );
};

export default Home;
```

- **`<main>`** :

  - `id="homepageContent"`, `aria-label="Contenu principal de la page d'accueil"`, `tabIndex={-1}`

- Trois sections principales :

  1. **HeroSection**
  2. **CategoriesGrid**
  3. **TopProductsGrid**

---

### 7.3. HeroSection & CarouselContainer

```jsx
// src/components/Home/HeroSection.jsx

import CarouselContainer from "./CarouselContainer";

const HeroSection = () => {
  return (
    <section
      id="heroSection"
      aria-label="Section héros avec contenu en vedette"
      className="w-full flex flex-col items-center justify-center p-10"
    >
      <div
        className="w-full flex flex-col items-center justify-center bg-primaryBackground rounded-md overflow-hidden"
        role="region"
        aria-label="Carrousel des éléments en vedette"
      >
        <CarouselContainer />
      </div>
    </section>
  );
};

export default HeroSection;
```

- Conteneur principal de rôle `region` avec `aria-label="Carrousel des éléments en vedette"`.
- Applique du style Tailwind pour centrer et donner un fond.

---

```jsx
// src/components/Home/CarouselContainer.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]); // Tableau des slides
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(API_ROUTES.CAROUSEL.ALL);
        const formattedSlides = response.data.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          description: item.text,
          ctaText: item.ctaText || "Voir nos produits",
          ctaLink: item.ctaLink || "/categories",
        }));
        setSlides(formattedSlides);
      } catch (err) {
        console.error("Erreur récupération carrousel :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Chargement du carrousel...</p>
      </div>
    );
  }

  return <Carousel slides={slides} delayTransitionImage={5000} />;
};

export default CarouselContainer;
```

- **Flux d’appel** :

  1. `useEffect` au montage → `fetchSlides()`
  2. `axios.get(API_ROUTES.CAROUSEL.ALL)`
  3. Mapping vers `{ id, imageUrl, title, description, ctaText, ctaLink }`
  4. **Loading fallback** : texte “Chargement du carrousel…”
  5. Appel du composant `<Carousel>` avec `slides` et `delayTransitionImage={5000}`

- **Composant `Carousel`** (existant) doit accepter :

  - `slides: Array<{ id, imageUrl, title, description, ctaText, ctaLink }>`
  - `delayTransitionImage: number` (en ms)

---

### 7.4. CategoriesGrid & CategoryCard

```jsx
// src/components/Home/CategoriesGrid.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const mappedCategories = Array.isArray(categories)
    ? categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        imageUrl:
          cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg",
        url: cat.id.toString(),
      }))
    : [];

  return (
    <section
      className="w-full py-10 px-6 md:px-20"
      aria-labelledby="categories-heading"
      role="region"
    >
      <h2
        id="categories-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground"
      >
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>

      {loading && (
        <p
          className="text-center text-blue-500 mt-4"
          role="status"
          aria-live="polite"
        >
          Chargement...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-4" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && mappedCategories.length === 0 && (
        <p className="text-center text-gray-600 mt-4" role="status">
          Aucune catégorie disponible pour le moment.
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6"
        role="list"
        aria-label="Liste des catégories"
      >
        {mappedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
```

- **Récupération Redux** : `state.categories.{ categories, loading, error }`
- **Mapping** :

  ```js
  const mappedCategories = Array.isArray(categories)
    ? categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        imageUrl:
          cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg",
        url: cat.id.toString(),
      }))
    : [];
  ```

- **États gérés** :

  - `loading` → “Chargement...”
  - `error` → message rouge (avec `role="alert"`)
  - Pas de données → “Aucune catégorie disponible pour le moment.”

```jsx
// src/components/Home/CategoryCard.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/categories/${category.url}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      role="region"
      aria-label={`Catégorie : ${category.name}`}
    >
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
    url: PropTypes.string.isRequired, // ex. "5" → /categories/5
    imageUrl: PropTypes.string.isRequired, // URL ou placeholder
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
```

- Carte simple :

  - `<Link to={`/categories/\${category.url}`}>`
  - Image (`loading="lazy"`, `alt`)
  - Titre centré

---

### 7.5. TopProductsGrid & ProductCard

```jsx
// src/components/Home/TopProductsGrid.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../redux/slice/topProductsSlice";
import ProductCard from "./ProductCard";

const TopProductsGrid = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.topProducts);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  const safeTopProducts = Array.isArray(items) ? items : [];

  return (
    <section
      className="w-full py-10 px-6 rounded-lg md:px-20 bg-gray-100"
      aria-labelledby="top-products-heading"
      aria-describedby="top-products-desc"
      role="region"
      tabIndex={-1}
    >
      <h2
        id="top-products-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground"
        tabIndex={-1}
      >
        Les Top Produits du moment
      </h2>
      <p id="top-products-desc" className="text-center text-gray-600 mt-2">
        Découvrez les solutions les plus demandées par nos clients.
      </p>

      {loading && (
        <p
          className="text-center text-blue-500 mt-4"
          role="status"
          aria-live="polite"
        >
          Chargement...
        </p>
      )}
      {error && (
        <p
          className="text-center text-red-500 mt-4"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      {!loading && !error && safeTopProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-4" role="status">
          Aucun produit en vedette pour le moment.
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        role="list"
        aria-label="Liste des top produits"
        tabIndex={0}
      >
        {safeTopProducts.map((product) => (
          <div
            role="listitem"
            key={product.id}
            aria-label={`Produit : ${product.name}`}
            tabIndex={0}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
```

- **Récupération Redux** : `state.topProducts.{ items, loading, error }`
- **Fichier d’appel** :

  ```js
  const url = `${API_ROUTES.PRODUCTS.ALL}/top-products?top=8&active=true&promo=true`;
  ```

- **États gérés** :

  - `loading` → “Chargement...”
  - `error` → message rouge
  - Pas de données → “Aucun produit en vedette pour le moment.”

```jsx
// src/components/Home/ProductCard.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageSrc =
    product.imageUrl ||
    (Array.isArray(product.images) && product.images[0]?.url) ||
    "/assets/images/placeholder-product.jpg";

  const productLink =
    product.link ||
    (typeof product.id === "number" || typeof product.id === "string"
      ? `/products/${product.id}`
      : "#");

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      role="region"
      aria-label={`Carte du produit ${product.name}`}
      tabIndex={0}
    >
      <img
        src={imageSrc}
        alt={product.name}
        loading="lazy"
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-md font-semibold text-gray-800" tabIndex={0}>
          {product.name}
        </h3>
        <Link
          to={productLink}
          className="mt-2 inline-block text-blue-500 font-semibold hover:underline hover:text-blue-700 transition"
          aria-label={`Voir le produit ${product.name}`}
        >
          Voir le produit
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({ url: PropTypes.string.isRequired })
    ),
    link: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
```

- Carte simple avec fallback d’image.
- Lien vers `/products/{id}`.
- `role="region"`, `aria-label`, `tabIndex={0}` pour l’accessibilité.
- `loading="lazy"` pour différer le chargement d’images hors écran.

---

## 8. Accessibilité et fallback

1. **ARIA & rôles**

   - Les sections principales (`HeroSection`, `CategoriesGrid`, `TopProductsGrid`) ont `role="region"` et `aria-label` explicites.
   - Le `<main>` de la HomePage porte `tabIndex={-1}` pour permettre un focus direct (skip to content).
   - Chaque liste utilise `role="list"` et chaque élément enfant `role="listitem"` pour indiquer la structure sémantique aux lecteurs d’écran.

2. **Placeholders d’images**

   - **CategoriesGrid** :

     ```js
     cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg";
     ```

   - **ProductCard** :

     ```js
     product.imageUrl ||
       (Array.isArray(product.images) && product.images[0]?.url) ||
       "/assets/images/placeholder-product.jpg";
     ```

   - Cela évite un `<img src={undefined}>` qui ferait planter le rendu.

3. **Gestion des états**

   - **Loading** : message en gris/bleu “Chargement...” avec `role="status"` et `aria-live="polite"`.
   - **Error** : message rouge avec `role="alert"` et `aria-live="assertive"`.
   - **Pas de données** (ex. `safeTopProducts.length === 0`) : message neutre “Aucun produit en vedette pour le moment.”

---

## 9. Styling et dépendances

- **TailwindCSS** : classes utilitaires (`max-w-6xl`, `mx-auto`, `text-primaryBackground`, etc.).
  Vérifiez que la config Tailwind (`tailwind.config.js`) inclut bien `primaryBackground` dans les couleurs, par exemple :

  ```js
  module.exports = {
    theme: {
      extend: {
        colors: {
          primaryBackground: "#F3F4F6", // ou la couleur choisie
        },
      },
    },
  };
  ```

- **Effets au survol** :

  - `hover:scale-105`, `hover:shadow-2xl` sur les cartes pour un effet de zoom et d’ombre.

- **Responsive** :

  - Grilles :

    - Catégories → 2 colonnes sur mobile (`grid-cols-2`), 3 colonnes à partir de `md` (`md:grid-cols-3`).
    - Top produits → 2 colonnes sur mobile, 4 colonnes à partir de `md`.

  - Paddings/margins modulés (`px-6`, `md:px-20`, etc.).

---

## 10. Tests et vérifications

- **En local** :

  1. Démarrer backend + frontend (`npm run dev`).
  2. Accéder à `http://localhost:5173/` → la HomePage doit afficher :

     - Le carrousel (HeroSection)
     - La grille des catégories
     - La grille des “Top Produits”

- **Cas d’erreur** :

  - Couper le microservice “categories” (8082) → voir le message d’erreur rouge dans la zone Catégories.
  - Couper le microservice “products/top-products” → voir le message d’erreur rouge dans la zone Top Produits.

- **Accessibilité clavier** :

  - Utiliser `Tab` pour s’assurer qu’on peut naviguer vers chaque section (HeroSheet, catégories, top produits).
  - Vérifier que les lecteurs d’écran lisent correctement les `aria-label`, `aria-live`.

- **Responsivité** :

  - Sur mobile / tablette / desktop, la grille doit passer de 2 → 3 → 4 colonnes sans chevauchement.

---

## 11. Points d’amélioration possibles

1. **Loader plus graphique**

   - Remplacer le simple “Chargement...” par un spinner CSS ou un composant `<Loader />`.

2. **Lazy-loading ou pagination**

   - Charger les “Top Produits” par page ou implémenter un infinite scroll si la liste devient volumineuse.

3. **Tests unitaires / snapshots**

   - Ajouter des tests pour chaque slice (avec Jest + React Testing Library) et pour chaque composant (ex. `CategoriesGrid`, `TopProductsGrid`, etc.).

4. **Gestion des erreurs centralisée**

   - Créer un composant `<ErrorMessage message={error} />` pour éviter la duplication de `role="alert"`.

5. **Prefetching**

   - Déclencher le fetch des catégories ou des top produits dès qu’on entre dans une autre vue, pour anticiper le chargement de la HomePage.

6. **SEO / Meta tags**

   - Ajouter un titre `<title>Accueil – Cyna SaaS</title>` et des `<meta>` descriptifs dans le `<head>` pour améliorer le référencement.

---

### Fin de la documentation
