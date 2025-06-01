# Authentification - Module Frontend Cyna

Projet : **Cyna – Projet Fil Rouge CPI 2024**
Frontend : **React + Redux Toolkit**
Backend : **Spring Boot / JWT**
Auteur : **Dammaretz Gaëtan** (@GD\@evWeb)
Version : Juin 2025

---

## 1. Objectif du module

Le module d'authentification gère l'ensemble des opérations liées à la gestion de l'utilisateur côté frontend :

- Inscription (register)
- Connexion (login)
- Validation du token (session active)
- Récupération des données utilisateur (profil)
- Mise à jour du profil utilisateur
- Déconnexion (logout)

Il prend en charge l'affichage conditionnel des routes protégées et la gestion automatique de l'expiration de session.

---

## 2. Architecture technique

### 2.1. Découpage des responsabilités

| Fichier / Dossier                          | Rôle principal                              |
| ------------------------------------------ | ------------------------------------------- |
| `authSlice.js`                             | Gestion du state global utilisateur         |
| `authService.js`                           | Appels API à l'auth backend via Axios       |
| `useAuthEffect.js`                         | Redirection si utilisateur non authentifié  |
| `useAutoLogout.js`                         | Expiration automatique du token             |
| `GlobalToastProvider.jsx`                  | Fournisseur de toast global via context API |
| `Login.jsx`, `Register.jsx`, `Profile.jsx` | Formulaires et interfaces utilisateur       |

---

### 2.2. Fonctionnement global

- **JWT** est stocké dans `localStorage` via `setToken()` / `getToken()`
- Les appels API utilisent une instance `apiClient` centralisée (`axiosConfig.js`) avec un intercepteur `Authorization: Bearer <token>`
- Le token est décodé côté client via `jwt-decode` pour extraire l'`id` (claim `jti`)
- `useAutoLogout()` calcule le `exp` du JWT pour déclencher automatiquement `logout()`

---

## 3. Pages concernées

| Page               | Statut auth requis | Comportement                                      |
| ------------------ | ------------------ | ------------------------------------------------- |
| `/login`           | Public             | Redirige vers `/profile` si déjà connecté         |
| `/register`        | Public             | Redirige vers `/profile` si création OK           |
| `/profile`         | Auth obligatoire   | Redirection automatique sinon                     |
| `/dashboard`       | Auth obligatoire   | Comportement conditionnel selon `user.role`       |
| `/orders`, `/cart` | Auth partiel       | Appels API conditionnels, messages toast si refus |

---

## 4. Toasts et UX feedback

Le système de `Toast` est centralisé via le `GlobalToastProvider` :

- Tous les appels peuvent afficher un `toast` de confirmation ou d'erreur
- L'expiration de session affiche automatiquement un toast d'avertissement :

```
Votre session a expiré. Veuillez vous reconnecter.
```

Utilisation :

```js
const { showToast } = useGlobalToast();
showToast("Authentification réussie", "success");
```

---

## 5. Accessibilité et bonnes pratiques

- Tous les formulaires sont étiquetés (`placeholder`, `required`, `aria-*`)
- Navigation clavier possible
- Les composants `Toast` sont lisibles à l'écran et temporisés automatiquement
- Les messages d'erreur et de succès sont explicites

---

## 6. Tests à vérifier avant livraison

| Comportement                             | Attendu                      |
| ---------------------------------------- | ---------------------------- |
| Inscription réussie                      | Redirection + toast          |
| Connexion avec mauvais credentials       | Message d'erreur visible     |
| Token expiré                             | Redirection + toast          |
| Accès direct /profile sans login         | Redirection auto vers /login |
| Utilisateur admin accède au dashboard    | Vue admin affichée           |
| Utilisateur standard accède au dashboard | Vue user affichée            |

---

## 7. Points à étendre (Backlog)

- Intégration OAuth / OpenID Connect (backend prévu)
- Réinitialisation de mot de passe fonctionnelle
- Page d'administration globale avec gestion des utilisateurs (admin only)
- Sécurisation du stockage token via HttpOnly cookie (hors MVP)

---

## 8. Liens utiles

- Backend : Swagger UI → `/swagger-ui/index.html`
- Frontend : `src/redux/slice/authSlice.js`, `src/services/authService.js`
- Configuration : `.env` → `VITE_API_BASE_URL`

---

## 9. Auteurs et maintenance

- **Auteur principal** : Dammaretz Gaëtan
- **Contact** : via GitLab interne ou Slack projet Cyna
- **Responsable futur** : Lucas T. (collaborateur Cyna 2025)

---

## 10. Dernière mise à jour

- **Date** : 1er juin 2025
- **Branche associée** : `SPRT05.01.FE_REFACTO/AuthSlice`
