# Projet Cyna – Frontend (version soutenance)

Ce document décrit l’architecture, la logique métier et les bonnes pratiques appliquées dans la partie frontend React de l’application **Cyna**, développée dans le cadre du projet fil rouge du Bachelor CPI 2024. L’accent est mis sur les éléments suivants :

- Intégration dynamique avec le backend
- Gestion robuste des erreurs et des fallback
- Respect des standards d’accessibilité
- Modularité des composants
- Fiabilité des interactions et navigation

---

## 1. Structure de la HomePage

Le point d’entrée principal est `HomePage.jsx`. Elle structure l’expérience utilisateur autour de trois blocs fonctionnels :

```jsx
<main id="homepageContent" className="max-w-7xl mx-auto my-4 px-4">
  <HeroSection />
  <section aria-label="Categories">
    <CategoriesGrid />
  </section>
  <section aria-label="Top Products">
    <TopProductsGrid />
  </section>
</main>
```

### Composants utilisés

| Composant         | Rôle principal                               |
| ----------------- | -------------------------------------------- |
| `HeroSection`     | Affichage de l’accroche marketing            |
| `CategoriesGrid`  | Grille interactive de catégories disponibles |
| `TopProductsGrid` | Mise en avant des produits/services phares   |

---

## 2. CategoriesGrid

### Source de données

- Requête API : `GET /api/v1/categories`
- Fallback : `MOCK_CATEGORIES` si erreur ou tableau vide

### Logique Redux

```js
createAsyncThunk("categories/fetchCategories", async (...) => { ... })
```

### Accessibilité & UI

- Grille : `role="list"`, `aria-label`
- Cartes : `alt` pour les images, `aria-labelledby`
- Gestion de l’état (`loading`, `error`, `empty`) avec messages dédiés

### Navigation

Chaque carte redirige vers `/categories/:categoryId`, où les produits liés à la catégorie sont affichés.

---

## 3. CategoryDetails (`/categories/:id`)

### Comportement

- Affiche dynamiquement la liste des produits liés à une catégorie
- Utilise le `categoryId` depuis `useParams()`
- Fallback local `MOCK_SERVICES` si l’API échoue
- Moteur de recherche intégré (filtrage local)

---

## 4. TopProductsGrid

### Source de données

- Requête API : `GET /api/v1/products/top-products`
- Fallback : `MOCK_TOP_PRODUCTS` si indisponibilité backend

### Règles de tri appliquées

1. Produits actifs ET en promotion
2. Produits actifs classiques
3. Produits inactifs

### UI

- Responsive : 2 à 4 colonnes selon la taille d’écran
- Accessibilité : `aria-label`, `loading="lazy"`, `alt` obligatoire

---

## 5. ProductList & Search (`/products`)

### Composant `ProductList.jsx`

- Liste paginée des produits (tous ou via recherche)
- Requête API : `GET /api/v1/products`
- Recherche API : `GET /api/v1/products/search?keyword=…&page=…&size=…`
- Fallback automatique si appel échoue

### Comportement

- Si champ recherche vide : retour à la liste complète
- Mise à jour automatique à la saisie utilisateur
- Logique hybride : affichage possible depuis données mockées

### Gestion des états

- `isSearchMode` : permet de différencier les vues
- `loadingSearch`, `errorList`, `searchResults`, `totalPages`

---

## 6. ProductDetails (`/products/:id`)

### Objectif

Afficher les détails complets d’un produit/service.

### Données consommées

- Requête API : `GET /api/v1/products/{id}`
- Gestion des erreurs :

  - 400 : redirection vers `/404`
  - 404 : redirection vers `/404`
  - Problème de parsing : message utilisateur + log développeur

### Composants internes

| Composant         | Description                                 |
| ----------------- | ------------------------------------------- |
| `ProductCarousel` | Galerie d’images produit                    |
| `ProductInfo`     | Détails généraux (nom, disponibilité, prix) |
| `ProductSpecs`    | Caractéristiques techniques                 |
| `ProductCTA`      | Appel à l’action (ajout au panier)          |

---

## 7. Ajout d’une fonctionnalité de recherche produits

### Objectif

Permettre à l’utilisateur de rechercher un produit par mot-clé, avec facettes et tri.

### API ciblée

- `GET /products/search?keyword=&page=0&size=6` (plus paramètres pour facettes et tri)

### Problèmes rencontrés

- Erreur SQL sur le backend : `Can't find FULLTEXT index matching the column list`
- Patch appliqué localement : création d’un index `FULLTEXT` sur les colonnes `name`, `description`, `brand`

### Résultat

- Composant `SearchPage.jsx` : page dédiée à la recherche avancée
- Fonctionnalité de recherche fonctionnelle et intégrée
- Navigation fluide entre liste complète, résultats filtrés et détail produit

---

## 8. SearchPage et fonctionnalité Recherche

### 8.1. Structure générale (`SearchPage.jsx`)

```jsx
<main className="container mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row">
  <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-6">
    <!-- Panneau des filtres -->
  </aside>
  <section className="w-full lg:w-3/4">
    <!-- Champ de recherche in-page -->
    <!-- Titre + bouton Réinitialiser -->
    <!-- Loader / Erreur / EmptyState / Grille produits -->
  </section>
</main>
```

- **Colonne gauche** : panneau des filtres (catégories, caractéristiques, prix, disponibilité).
- **Colonne droite** : champ de recherche in-page, titre, tri, résultats.

### 8.2. Champ de recherche in-page

- Placé immédiatement sous le panneau de filtres (ou sous le header sur mobile).
- Reçoit le focus automatique au chargement de la page.
- Synchronisé avec le slice Redux `searchSlice` (via `localInput` et `query`).
- Debounce de 300 ms :

  - `dispatch(setQuery(trimmed))`
  - `dispatch(searchProducts({ keyword: trimmed, catégories, caractéristiques, prix, disponibilité, tri, page, size }))`
  - Si l’input est vide, `dispatch(clearSearch())`.

### 8.3. Affichage conditionnel

1. **`query === ""`**

   - Affiche le titre “Recherche” et un message centré :
     _“Tapez un mot-clé (ex. : ‘EDR’, ‘SOC Premium’, ‘XDR’) pour lancer la recherche.”_

2. **`loading === true`**

   - Affiche `<Loader />` centré dans un conteneur à hauteur fixe (`h-40`).

3. **Sinon**

   - Si `error` non nul : bannière d’avertissement en jaune (role="alert", aria-live="assertive").
   - Affiche le sélecteur “Trier par” aligné à droite (`<SortSelect />`).
   - Si `searchResults.length === 0 && error === null` : `<EmptyState message="Aucun produit ne correspond à votre recherche." />`.
   - Sinon : affichage de la grille responsive :

     ```jsx
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {searchResults.map((product) => (
         <ProductCard key={product.id} product={product} />
       ))}
     </div>
     ```

### 8.4. Panneau des filtres

- **Catégories** : `FilterCheckboxes` (options issues du store Redux `categoriesList`).
- **Caractéristiques techniques** : `FilterCheckboxes` avec liste statique (Cloud-native, SIEM, XDR, EDR).
- **Prix** : `PriceSlider` (inputs `number` pour min/max, bornes dynamiques).
- **Disponibilité** : `AvailabilityToggle` (case à cocher).
- **Réinitialiser tous les filtres** : bouton qui appelle `handleResetAll()` (vide toutes les facettes, `localInput`, `query`).

### 8.5. Synchronisation Redux / Composants

- **`searchSlice.js`** :

  - `setQuery(payload)` : met à jour `query` et bascule en mode recherche.
  - `searchProducts(params)` : thunk pour appeler l’API ou appliquer le fallback mock.
  - `clearSearch()` : remet le slice à l’état initial.

- **`SearchBar.jsx`** (navbar desktop) :

  - Debounce 300 ms, dispatch `setQuery` + `searchProducts({ keyword, page: 0, size: 6 })`, `navigate("/search")`.
  - Synchronisation automatique avec l’input in-page via `useEffect([query])`.

- **`SearchPage.jsx`** :

  - Synchronise `localInput` avec `query`.
  - Debounce 300 ms, dispatch `setQuery` + `searchProducts(...)` avec facettes et tri.
  - Focus automatique sur l’input in-page.

---

## 9. Composants utilitaires

### 9.1. `SearchBar.jsx` (Navbar)

```jsx
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearSearch,
  searchProducts,
  setQuery,
} from "../redux/slice/searchSlice";

const DEBOUNCE_DELAY = 300;

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed !== "") {
        dispatch(setQuery(trimmed));
        dispatch(searchProducts({ keyword: trimmed, page: 0, size: 6 }));
        if (location.pathname !== "/search") {
          navigate("/search");
        }
      }
      if (trimmed === "") {
        dispatch(clearSearch());
      }
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [inputValue, dispatch, navigate, location]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setInputValue("");
      dispatch(clearSearch());
    }
  }, [location.pathname, dispatch]);

  const handleClear = () => {
    setInputValue("");
    dispatch(clearSearch());
  };

  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Rechercher un produit ou service…"
        className="w-64 px-3 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Champ de recherche de produit"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Effacer la recherche"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}
```

### 9.2. `EmptyState.jsx`

```jsx
import React from "react";
import PropTypes from "prop-types";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h18v18H3V3z"
        />
      </svg>
      <p>{message}</p>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};
```

### 9.3. `Loader.jsx`

```jsx
import React from "react";
import PropTypes from "prop-types";

export default function Loader({ "aria-label": ariaLabel }) {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className="flex items-center justify-center py-12"
    >
      <svg
        className="animate-spin h-10 w-10 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
        />
      </svg>
    </div>
  );
}

Loader.propTypes = {
  "aria-label": PropTypes.string.isRequired,
};
```

---

## 10. Composant `Navbar.jsx` et adaptation mobile

```jsx
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-cyna-white.svg";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-white px-4 py-2 flex items-center justify-between">
      <Link to="/" aria-label="Accueil Cyna">
        <img src={logo} alt="Logo Cyna" className="w-40 sm:w-40" />
      </Link>

      <nav
        className="hidden lg:flex items-center space-x-4"
        aria-label="Navigation principale"
      >
        <NavbarLinks />
        <SearchBar />
      </nav>

      <div className="flex items-center space-x-4" aria-label="Panier">
        <CartBadge />
      </div>

      <div className="lg:hidden flex items-center space-x-4">
        <button
          className="text-white text-xl p-2"
          onClick={() => navigate("/search")}
          aria-label="Ouvrir la recherche"
        >
          <FaSearch />
        </button>
        <MobileMenu />
      </div>
    </header>
  );
}
```

- En desktop : `NavbarLinks`, `SearchBar`, `CartBadge`.
- En mobile : bouton loupe redirigeant vers `/search`, `MobileMenu`.
- Modal overlay supprimé (cf. §13).

---

## 11. Configuration du routeur

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
// Autres imports si nécessaire

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductPage />} />
            {/* Autres routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

---

## 12. Étapes d’installation et de test

1. **Installer les dépendances**

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

2. **Démarrer le serveur de développement**

   ```bash
   npm start
   ```

   ou

   ```bash
   yarn start
   ```

3. **Tester la fonctionnalité**

   - Accéder à `http://localhost:3000/`.
   - Vérifier la Navbar (desktop vs. mobile).
   - Tester la page `/search` :

     1. Champ de recherche in-page reçu focus.
     2. Saisie d’un mot-clé → résultats ou fallback mock.
     3. Facettes et tri fonctionnent.
     4. Bouton “Réinitialiser” réinitialise complètement.

4. **Tester le fallback mock**

   - Arrêter le backend.
   - Taper un mot-clé → bannière d’erreur + mock filtré.
   - Si aucun mock ne correspond, afficher “Aucun produit…”.

5. **Tester l’accessibilité**

   - Navigation clavier (Tab, Shift+Tab).
   - Messages d’erreur (`role="alert"`), loader (`role="status"`).
   - Contraste des couleurs (texte noir sur fond blanc, violet foncé, gris foncé).

6. **Tester la responsivité**

   - Desktop : deux colonnes, grille 3 colonnes.
   - Tablette : filtres au-dessus, grille 2 colonnes.
   - Mobile : filtres et champ in-page au-dessus, grille 1 colonne.

---

## 13. Mise à jour mobile : suppression du modal overlay

Le comportement mobile a été simplifié :

- **Ancienne version** : ouverture d’une modale sombre (`ModalOverlay`) contenant un champ de recherche.
- **Nouvelle version** : le bouton loupe redirige immédiatement vers la page `/search`.

  - Le champ in-page reçoit le focus automatique.
  - L’utilisateur n’a plus à fermer une modale intermédiaire.
  - Cette mise à jour est décrite dans la section “SearchPage” (§8) et dans le code du composant `Navbar.jsx` (§10).

> **Cf. update apporté à la table :**
> La table de navigation mobile a été supprimée au profit d’une redirection directe vers `/search`.

---

## 14. Bonnes pratiques appliquées

- **Fallback systématique** en cas de panne backend (mock filtré).
- **Logs explicites** côté développeur (`console.log` dans les thunks pour débogage).
- **Composants découplés et testables** : chaque petit composant gère une responsabilité unique.
- **Respect des contrats API** et des types de données (utilisation de `PropTypes`).
- **Accessibilité respectée** : `aria-*`, navigation clavier, messages dynamiques.
- **Responsive Design** : grille et mise en page adaptatives (1 à 4 colonnes).
- **Débogage facilité** : messages d’erreur clairement affichés, distinction entre erreur d’API et fallback mock.
- **Code commenté** de manière synthétique, sans émoticônes, pour faciliter la lecture et la maintenance.

---

## 15. À venir / Prochaines étapes

- Refactorisation des composants pour uniformiser la gestion des erreurs et des loaders.
- Ajout de tests unitaires sur la logique Redux Toolkit (slices, extraReducers, thunks).
- Internationalisation (i18n) des messages statiques.
- Amélioration des performances : mise en place de `React.memo`, `useMemo` et `lazy loading` avancé des composants.
- Pagination plus fine avec navigation par page (numérotation, “Précédent/Suivant”).
- Couverture E2E (Cypress, Playwright) pour la recherche, les filtres et la navigation mobile.

---

## Conclusion

- L’ensemble des fonctionnalités intégrées dans la HomePage, la gestion des catégories, la recherche avancée et le détail produit respecte pleinement le Cahier des Charges. 
- La navigation est fluide, la gestion des erreurs est robuste, et les composants sont modulaires, testables et prêts pour une intégration en production.
---
⚠️ Note importante sur cette version du projet

Cette version du dépôt contient exclusivement le code frontend (React) développé pour le projet Cyna.
Sans le backend (API REST en Spring Boot), elle se comporte comme un site vitrine statique :

Les fonctionnalités dynamiques (authentification, gestion du panier, abonnements Stripe, profils utilisateurs) ne sont pas opérationnelles.

Les données sont simulées localement via des mocks ou des fallbacks en cas d'absence d'API.

Le backend complet a été développé séparément, présenté lors de la soutenance, et documenté via Swagger. Il est disponible sur un dépôt distinct (non inclus ici) et nécessite une configuration indépendante pour les tests complets.

Le APIKeys peuvent être présentes dans le .env ci-joint, nous sommes conscients des risques pour le cas d'un projet réel. 

