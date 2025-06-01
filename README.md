# Projet Cyna (version soutenance / collaboratif)

# Cyna – Plateforme de services SaaS cybersécurité

> Projet fil rouge 2024 – Bachelor CPI – SUP DE VINCI  
> Frontend développé en React + Redux Toolkit + Tailwind CSS  
> Backend : API REST Spring Boot (voir dépôt associé)

---

## Objectif

Cyna est une plateforme web de présentation et de souscription à des services SaaS dans le domaine de la cybersécurité.  
L’utilisateur peut consulter les services disponibles, filtrer par catégories, accéder aux détails, gérer un panier et simuler une souscription.

---

## Stack technique

| Côté client      | Description                                      |
| ---------------- | ------------------------------------------------ |
| ⚛️ React         | Framework SPA principal                          |
| 📦 Redux Toolkit | Gestion d’état globale (panier, auth, recherche) |
| 🎨 Tailwind CSS  | Stylisation UI rapide et responsive              |
| 🔐 JWT           | Authentification et sécurisation des appels API  |
| 📡 Axios         | Requêtes HTTP avec gestion d’erreurs & tokens    |
| 🛒 LocalStorage  | Persistance du panier utilisateur                |

---

## Structure du projet

```

src/
├── components/ # Composants UI réutilisables
├── pages/ # Pages principales (Home, Product, Search, etc.)
├── redux/ # Slices Redux (auth, cart, search...)
├── layout/ # Composants globaux (Navbar, Footer)
├── assets/ # Images, logos, icônes
├── api/ # Définition des routes API
├── App.jsx # Routing principal (React Router)
└── main.jsx # Entrée de l’app React

```

---

## Authentification

- Auth via JWT (système de token géré avec `localStorage`)
- Pages sécurisées accessibles uniquement après login (`/profile`, `/checkout`, etc.)
- `authSlice.js` → login, register, validation, refresh token (si backend compatible)

---

## Fonctionnalité clé : Recherche transverse

> Fallback frontend (search live local)

- La recherche en live se fait via un **cache local des produits** (`GET /products`)
- L’API `/products/search` étant non fonctionnelle (erreur FULLTEXT SQL), nous avons mis en place un fallback robuste :
  - Préchargement des produits dans `searchSlice`
  - Déclenchement via `SearchBar` (desktop) ou `SearchOverlay` (mobile)
  - Affichage dynamique des résultats via `filter()` JS
  - UX responsive, accessible et cohérente

Cette décision est **documentée, assumée et justifiée** dans le mémoire.

---

## Gestion du panier

- Persistance en `localStorage`
- Ajout, suppression, changement de quantité
- CTA vers `checkout` (à connecter selon la stratégie backend)
- Composants : `CartItem`, `CartSummary`, `CartBadge`

---

## Responsive & UX

- `Tailwind CSS` → grille responsive (`grid-cols-*`)
- Overlay de recherche mobile dédié (UX type application native)
- Accessibilité respectée (`aria-label`, `alt`, `tabIndex`)
- Placeholder, messages d’erreur, et fallback visuels (`EmptyState`, `Toast`)

---

## Installation & lancement local

```bash
# Installation
npm install

# Lancement du serveur de développement
npm run dev

# Formatage automatique (Prettier)
npm run format
```

> Vérifiez que le backend est lancé sur `http://localhost:8082`

---

## Routes disponibles

| Route                 | Description                        |
| --------------------- | ---------------------------------- |
| `/`                   | Page d’accueil                     |
| `/categories/:id`     | Liste des produits d’une catégorie |
| `/products/:id`       | Détail d’un produit/service SaaS   |
| `/search`             | Résultats de recherche (live)      |
| `/cart`               | Panier utilisateur                 |
| `/login`, `/register` | Authentification                   |
| `/profile`            | Données personnelles (après login) |

---

## Équipe

- **Gaëtan Dammaretz** – Dev Frontend / Architecte UI/UX / Référent technique
- **Lucas \[Nom]** – Dev Frontend (prise de relais à partir du 3 juin)

---

## Notes techniques

- Gestion multi-environnement possible via `.env` (pas encore implémentée)
- API Gateway en reverse proxy (`8082`)
- Documentation Swagger disponible côté backend

---

## ❌ Issues

- Feature auth/profile/avatar => pb d'exposition - impossible de récupérer l'avatar sans toucher au BE mais envoi ok
  - [voir notes](./docs/PROFILE_AVATAR.md)

---

## Améliorations futures (TODO)

- Ajouter pagination et tri serveur dans la recherche
- Affichage des produits similaires
- Connexion panier ↔ Stripe (checkout réel)
- Dark mode (facile via Tailwind)
- Tests Cypress / Jest (non couverts à ce stade)

---

## Dossiers liés

- [Documentation authentification (MD)](./docs/AUTH.md)
- [Dépôt backend Spring Boot (privé GitLab CE)](http://git.ce.cyna/backend-cyna)
- [Documentation Swagger](http://localhost:8082/swagger-ui.html)
- [Documentation du projet (PDF)](./docs/CDC_Projet_Cyna.pdf)

> Passation effectuée le 2 juin à Lucas — toutes les fonctionnalités sont documentées et fonctionnelles.

---
