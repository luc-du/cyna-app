# Documentation de la HomePage

Cette documentation récapitule l’ensemble des modifications et des nouveaux composants créés pour la **HomePage** de l’application. Elle est destinée à faciliter la prise en main du collègue qui reprend ce refacto, en détaillant la structure, le fonctionnement, les slices Redux, les services appelés, et les points d’attention (accessibilité, fallback, etc.).

---

## Table des matières

1. [Contexte et objectifs](#contexte-et-objectifs)
2. [Prérequis et installation](#prérequis-et-installation)
3. [Configuration du proxy Vite](#configuration-du-proxy-vite)
4. [Structure des dossiers et fichiers principaux](#structure-des-dossiers-et-fichiers-principaux)
5. [Routes API utilisées](#routes-api-utilisées)
6. [Slices Redux](#slices-redux)

   1. [categorySlice](#categoryslice)
   2. [topProductsSlice](#topproductsslice)

7. [Composants de la HomePage](#composants-de-la-homepage)

   1. [Homepage](#homepage)
   2. [Home](#home)
   3. [HeroSection & CarouselContainer](#herosection--carouselcontainer)
   4. [CategoriesGrid & CategoryCard](#categoriesgrid--categorycard)
   5. [TopProductsGrid & ProductCard](#topproductsgrid--productcard)

8. [Accessibilité et fallback](#accessibilité-et-fallback)
9. [Styling et dépendances](#styling-et-dépendances)
10. [Tests et vérifications](#tests-et-vérifications)
11. [Points d’amélioration possibles](#points-damélioration-possibles)

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
3. Avoir le backend Spring Boot démarré sur les ports définis (8081 pour auth/user, 8082 pour categories/products/carousel).
4. Avoir le service Stripe (port 8083) démarré si besoin.

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
- (tailwindcss / classes utilitaires comme défini dans le projet)

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
      "/api": {
        target: "http://localhost:8080", // ou un autre port selon l’API agrégée
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
```

> **Remarque :**
>
> - L’API est exposée sous `/api/v1/...` dans le backend. Si un microservice tourne sur un port différent (par ex. 8082 pour categories/products/carousel), le proxy doit être ajusté ou des variables d’environnement ajouter dans `apiRoutes.js`.

---

## 4. Structure des dossiers et fichiers principaux

```
src/
├── api/
│   └── apiRoutes.js           # Définit les constantes des endpoints
│
├── components/
│   └── Home/
│       ├── Homepage.jsx       # Point d’entrée de la HomePage
│       ├── Home.jsx           # Conteneur principal (Hero + Promo + Categ + TopProducts)
│       ├── HeroSection.jsx     # Section “Hero” (carrousel)
│       ├── CarouselContainer.jsx # Récupération des slides + wrapping Carousel
│       ├── Carousel.jsx        # Composant de carrousel “générique” (précédemment existant)
│       ├── CategoriesGrid.jsx  # Liste des catégories (Redux fetch + loading/error)
│       ├── CategoryCard.jsx    # Carte individuelle d’une catégorie
│       ├── PromoSection.jsx    # Section de promotions statique ou dynamique (si existant)
│       ├── TopProductsGrid.jsx # Liste des top produits (Redux fetch + loading/error)
│       └── ProductCard.jsx     # Carte individuelle d’un produit
│
└── redux/
    └── slice/
        ├── categorySlice.js       # Slice pour fetchCategories
        ├── topProductsSlice.js    # Slice pour fetchTopProducts
        └── (autres slices existants)
```

- **`api/apiRoutes.js`**
  Définit toutes les routes vers les microservices (auth, user, categories, carousel, products, etc.).
  Exemple :

  ```js
  export const API_ROUTES = {
    CAROUSEL: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_CAROUSEL}${API_BASE}/carousel`,
      GET_BY_ID: (id) =>
        `${PROTOCOL}://${HOST}:${PORT_CAROUSEL}${API_BASE}/carousel/${id}`,
      // ...
    },
    CATEGORIES: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories`,
      GET_BY_ID: (id) =>
        `${PROTOCOL}://${HOST}:${PORT_CATEGORIES}${API_BASE}/categories/${id}`,
      // ...
    },
    PRODUCTS: {
      ALL: `${PROTOCOL}://${HOST}:${PORT_PRODUCTS}${API_BASE}/products`,
      // ...
    },
    // …
  };
  ```

- **Slices Redux**
  Contiennent la logique d’appel API (via `createAsyncThunk`) et stockent `items`, `loading`, `error` dans le store.

---

## 5. Routes API utilisées

- **Carrousel**

  - `GET /api/v1/carousel` → Récupère la liste des slides.
    Chaque slide renvoie `{ id, imageUrl, title, text, ctaText?, ctaLink? }`.

- **Catégories**

  - `GET /api/v1/categories` → Récupère un tableau de `{ id, name, description, images: [ { id, name, url, uploadDate } ], products: [...] }`.

- **Top Produits**

  - `GET /api/v1/products/top-products?top=...&promo=...&active=...` → Renvoie un tableau de `ProductGetDto` (avec `salesNumber`, etc.).
  - Alternativement, la slice peut cibler un endpoint personnalisé `/api/v1/products/search` ou `/pagination` selon le besoin.

> **Attention**
> Les services “categories” et “products” tournent sur `localhost:8082` dans notre swagger, et le service “auth”/“user” sur `localhost:8081`. Vérifier que le proxy Vite envoie bien `/api/v1/...` au bon port. Sinon, ajouter des lignes spécifiques dans `vite.config.js` :

```js
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
  // …
}
```

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
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ROUTES.CATEGORIES.ALL);
      return response.data; // tableau de catégories
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // données reçues
    loading: false, // booléen “chargement”
    error: null, // message d’erreur s’il y en a une
  },
  reducers: {
    // (aucun reducer “local” supplémentaire)
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
      });
  },
});

export default categorySlice.reducer;
```

- **États gérés** :

  - `loading`: `true` pendant l’appel API
  - `error`: message d’erreur si la requête échoue
  - `categories`: tableau rempli à la réception des données

- **Usage** : Vu dans `CategoriesGrid.jsx` (voir section dédiée).

---

### 6.2. topProductsSlice

```js
// src/redux/slice/topProductsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// Thunk pour récupérer les “Top Produits du moment”
export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      // On peut passer ?top=8 (ou un autre nombre) selon la spec backend
      const response = await axios.get(
        `${API_ROUTES.PRODUCTS.ALL}/top-products?top=8&active=true&promo=true`
      );
      return response.data; // tableau de produits
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const topProductsSlice = createSlice({
  name: "topProducts",
  initialState: {
    items: [], // tableau des produits en “vedette”
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
      });
  },
});

export default topProductsSlice.reducer;
```

- **Méthode d’appel** : `GET /api/v1/products/top-products?top=8&active=true&promo=true`
- **États gérés** : `items`, `loading`, `error`
- **Usage** : Vu dans `TopProductsGrid.jsx` (voir section dédiée).

---

## 7. Composants de la HomePage

### 7.1. Homepage

```jsx
// src/components/Home/Homepage.jsx

import Home from "../components/Home/Home";

const Homepage = () => {
  return <Home />;
};

export default Homepage;
```

Simple wrapper qui importe le composant principal **Home**. Il est utilisé dans le **Router** pour la route `/`.

---

### 7.2. Home

```jsx
// src/components/Home/Home.jsx

import CategoriesGrid from "./CategoriesGrid";
import HeroSection from "./HeroSection";
import PromoSection from "./PromoSection";
import TopProductsGrid from "./TopProductsGrid";

const Home = () => {
  return (
    <main
      id="homepageContent"
      className="max-w-6xl mx-auto my-4 px-4"
      tabIndex={-1}
      aria-label="Homepage main content"
    >
      {/* Section “Hero” avec le carrousel */}
      <HeroSection />

      {/* Section Promotions (statique ou dynamique selon PromoSection) */}
      <section aria-label="Promotions">
        <PromoSection />
      </section>

      {/* Section CategoriesGrid */}
      <section aria-label="Categories">
        <CategoriesGrid />
      </section>

      {/* Section TopProductsGrid */}
      <section aria-label="Top Products">
        <TopProductsGrid />
      </section>
    </main>
  );
};

export default Home;
```

- **`<main>`** : identifiant `homepageContent`, `aria-label`, `tabIndex={-1}` pour la navigation clavier.
- Quatre sections :

  1. **HeroSection** (carrousel)
  2. **PromoSection** (section de promotion statique)
  3. **CategoriesGrid**
  4. **TopProductsGrid**

---

### 7.3. HeroSection & CarouselContainer

```jsx
// src/components/Home/HeroSection.jsx

import CarouselContainer from "./CarouselContainer";

const HeroSection = () => {
  return (
    <section
      id="heroSection"
      aria-label="Hero section with featured content"
      className="w-full flex flex-col items-center justify-center p-10"
    >
      <div
        className="w-full flex flex-col items-center justify-center bg-primaryBackground rounded-md overflow-hidden"
        role="region"
        aria-label="Featured carousel"
      >
        <CarouselContainer />
      </div>
    </section>
  );
};

export default HeroSection;
```

- Conteneur de rôle `region`, `aria-label="Featured carousel"`.
- Classe utilitaire Tailwind pour centrage et style.

---

```jsx
// src/components/Home/CarouselContainer.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import Carousel from "./Carousel"; // Composant de carrousel réutilisé

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]); // Tableau des slides récupérées
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(API_ROUTES.CAROUSEL.ALL);
        // Formatter chaque item pour correspondre aux props du composant Carousel
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

  // On passe les slides au composant générique <Carousel>
  return <Carousel slides={slides} delayTransitionImage={5000} />;
};

export default CarouselContainer;
```

- **Flux d’appel** :

  1. `useEffect` au montage → `fetchSlides()`
  2. `axios.get(API_ROUTES.CAROUSEL.ALL)` (GET `/api/v1/carousel`)
  3. Mapping des slides → tableau d’objets `{ id, imageUrl, title, description, ctaText, ctaLink }`
  4. **Loading fallback** (texte “Chargement du carrousel...”)
  5. Affichage du composant `<Carousel>` avec `slides` et `delayTransitionImage`.

- **Carousel** est supposé exister (librairie interne) :
  Acceptant des props `{ slides: array, delayTransitionImage: number }`.

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
    // Si le store ne contient pas déjà de catégories, on déclenche la requête
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  // On fournit un fallback d’image si aucune n’est définie
  const mappedCategories = (categories || []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    imageUrl: cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg",
    url: cat.id.toString(),
  }));

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
- **Mapping** : on transforme chaque catégorie brute en objet `{ id, name, imageUrl, url }`
- **Fallback d’image** : `"/assets/images/placeholder-category.jpg"` si `cat.images[0]?.url` est absent
- **Affichage** :

  - Texte de chargement si `loading === true`
  - Message d’erreur si `error !== null`
  - Grille de `<CategoryCard>` si on a bien un array (même vide)

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
    imageUrl: PropTypes.string.isRequired, // URL de la première image
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
```

- Composant simple :

  - `<Link>` vers `/categories/{category.url}`
  - Image en haut, titre centré en dessous
  - Ajout de `role="region"` et `aria-label` pour l’accessibilité
  - `loading="lazy"` pour différer le chargement d’images hors écran

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
  const {
    items: topProducts,
    loading,
    error,
  } = useSelector((state) => state.topProducts);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  // On s’assure que topProducts est toujours un tableau
  const safeTopProducts = Array.isArray(topProducts) ? topProducts : [];

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
- **safeTopProducts** : on utilise `Array.isArray(...) ? ... : []` pour éviter `map` sur `undefined`
- **Fallback** :

  - `loading`: “Chargement...”
  - `error`: message en rouge
  - `safeTopProducts.length === 0`: “Aucun produit en vedette pour le moment.”

- **Grille** : chaque produit enveloppé dans un `div role="listitem"`, avec `aria-label` et `tabIndex=0`.

```jsx
// src/components/Home/ProductCard.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Détermination de l'URL de l’image (fallback placeholder)
  const imageSrc =
    product.imageUrl ||
    (Array.isArray(product.images) &&
      product.images.length > 0 &&
      product.images[0].url) ||
    "/assets/images/placeholder-product.jpg";

  // Génération du lien vers la page produit
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
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    link: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
```

- **Fallback d’image** : un placeholder si ni `product.imageUrl` ni `product.images[0].url`
- **Lien** : on vérifie `product.link` (optionnel), sinon on formate `/products/{id}`.
- **Accessibilité** :

  - `role="region"`, `aria-label="Carte du produit X"`, `tabIndex={0}`
  - `<img loading="lazy" alt="{product.name}" />`

---

## 8. Accessibilité et fallback

1. **ARIA & Rôles**

   - Les sections principales (`HeroSection`, `CategoriesGrid`, `TopProductsGrid`) ont `role="region"` et `aria-label` explicites.
   - Le `<main>` de la HomePage porte `tabIndex={-1}` pour faciliter le focus direct en cas de “skip to content”.
   - Chaque `list` (`grid`) utilise `role="list"` et chaque élément enfant `role="listitem"` pour les lecteurs d’écran.

2. **Placeholder d’images**

   - **CategoriesGrid** :

     ```js
     imageUrl: cat.images?.[0]?.url ||
       "/assets/images/placeholder-category.jpg";
     ```

   - **ProductCard** :

     ```js
     const imageSrc =
       product.imageUrl ||
       (Array.isArray(product.images) && product.images[0]?.url) ||
       "/assets/images/placeholder-product.jpg";
     ```

   - Cela évite un `<img src={undefined}>` qui ferait planter le rendu.

3. **Gestion des états**

   - `loading` : message “Chargement...” avec `aria-live="polite”`
   - `error` : message rouge avec `role="alert"` et `aria-live="assertive”`
   - “Pas de données” (pour TopProductsGrid) si le tableau est vide.

---

## 9. Styling et dépendances

- **TailwindCSS** est utilisé pour la plupart des classes utilitaires (`max-w-6xl`, `mx-auto`, `text-primaryBackground`, etc.). Vérifier que la config Tailwind inclut bien les couleurs (ex. `primaryBackground`) dans le `tailwind.config.js`.
- **Hover effects** sur chaque carte (`hover:scale-105`, `hover:shadow-2xl`).
- **Responsive**

  - Grilles en **2 colonnes** sur mobile (`grid-cols-2`), **3 colonnes** sur `md` pour catégories, **4 colonnes** pour top produits (`md:grid-cols-4`).
  - Marges/paddings adaptés (`px-6 md:px-20`, etc.).

---

## 10. Tests et vérifications

- Vérifier en local :

  - Démarrer backend + frontend (`npm run dev`).
  - Accéder à `http://localhost:5173/` → la HomePage doit afficher le carrousel, les catégories et les “top produits”.

- Vérifier les cas d’erreurs :

  - Simuler un échec du fetch (par ex. stopper le microservice `categories`) → on voit bien le message d’erreur en rouge.
  - Si pas de catégories (tableau vide) → la grille s’affiche vide, sans crash.

- Vérifier l’accessibilité :

  - Parcourir au clavier (`Tab`) pour s’assurer des bonnes priorités de focus (main → HeroSection → “Promotions” → “Catégories” → “Les Top Produits”).
  - Utiliser un lecteur d’écran rapide pour s’assurer des `aria-label` corrects.

- Vérifier la responsivité :

  - Sur desktop / tablette / mobile : la grille s’adapte (2→3→4 colonnes).

---

## 11. Points d’amélioration possibles

1. **Loader plus graphique**

   - Remplacer le simple “Chargement...” par un spinner CSS ou un composant `<Loader />`.

2. **Pagination ou lazy-loading**

   - Charger les “Top Produits” par page ou implémenter un infinite scroll si la liste peut être longue.

3. **Tests unitaires / snapshot**

   - Ajouter des tests pour chaque slice (`categorySlice`, `topProductsSlice`) et pour chaque composant (avec Jest + React Testing Library).

4. **Gestion des erreurs de manière uniforme**

   - Factoriser un composant `<ErrorMessage message={error} />` pour éviter la duplication du `p.role="alert"`.

5. **Préfetching**

   - Si on veut alléger la HomePage, précharger les catégories ou top produits dès la navigation sur une autre vue.

6. **SEO / Meta tags**

   - Ajouter un titre `<title>Accueil – Cyna SaaS</title>` et des `<meta>` descriptifs dans le head pour la HomePage.

---

### Fin de la documentation

Ce README couvre la totalité des modifications et des composants mis en place pour la **HomePage**. Il peut être transmis tel quel au collègue pour qu’il comprenne rapidement le découpage, l’enchaînement des slices Redux, les endpoints consommés, ainsi que les principes d’accessibilité et de fallback appliqués.
