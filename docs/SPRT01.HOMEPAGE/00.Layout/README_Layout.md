# Documentation technique – Layout global (Header + Navbar + Footer)

**Sprint** : SPRT01.HOMEPAGE  
**Composants couverts** : `Header.jsx`, `Navbar.jsx`, `NavbarLinks.jsx`, `Footer.jsx`, `MobileMenu.jsx`, `CartBadge.jsx`, `SearchBar.jsx`, `DarkModeToggle.jsx`

---

## Objectifs

Mettre en place un **layout structurel complet et cohérent** pour l’ensemble de l’application Cyna, incluant :

- Une **navigation responsive** (desktop / mobile)
- Un **header** minimaliste et cohérent avec le branding
- Une **navigation claire et accessible**
- Un **footer discret, légal et stylisé**
- Une **gestion du thème sombre (dark mode)** cohérente

---

## Structure

### Header

Composant principal contenant la `Navbar` + `DarkModeToggle`.  
Classe principale :

```jsx
<header className="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 text-primary dark:text-white shadow-md">
```

````

- Supporte le dark mode
- Reste fluide jusqu’à `xl`
- Contient logo, `NavbarLinks`, barre de recherche, panier

### 🔹 Navbar

Responsable de la navigation principale. Composants imbriqués :

- `NavbarLinks` (liens `Accueil`, `Catégories`, etc.)
- `SearchBar` (input avec debounce)
- `CartBadge` (badge dynamique panier)
- `MobileMenu` (menu burger en-dessous de 1024px)

Adapté via `lg:hidden`, `lg:flex`, `max-w`, `gap-*`, `pl-*`, `z-50`, `absolute`.

### 🔹 Footer

Pied de page discret, responsive à partir de `sm`.
Deux sections :

- Liens légaux : CGU, Mentions légales, Contact
- Réseaux sociaux (Facebook, X, LinkedIn)

Classes principales :

```jsx
<footer className="hidden sm:flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white border-t border-gray-300 dark:border-gray-700">
```

---

##  Fonctions clés intégrées

| Fonction            | Composant concerné             | Description                                                        |
| ------------------- | ------------------------------ | ------------------------------------------------------------------ |
| Barre de recherche  | `SearchBar.jsx`                | Navigation instantanée vers `/search`, clear button, debounce      |
| Compteur panier     | `CartBadge.jsx`                | Badge dynamique avec `aria-label`, accessible en mobile et desktop |
| Responsive          | `Navbar.jsx`, `MobileMenu.jsx` | Gestion breakpoint `lg`, `xl`, `sm:hidden`                         |
| Accès rapide mobile | `MobileMenu`                   | Menu déroulant à `z-50`, `absolute`, liens cliquables              |
| Thème sombre        | `DarkModeToggle`, `uiSlice`    | Toggle `switch` présent dans `Header`, classe `dark` persistée     |

---

##  Accessibilité

- `aria-label` pour chaque lien, bouton, image ou input
- `role=region`, `role=button`, `aria-describedby` sur les sections
- Compatible clavier (`tab`, `focus`, `enter`)
- Contrastés adaptés en clair et sombre (`text-gray-800`, `text-white`)

---

##  Respect de la charte

- Le violet (`bg-primary`) n’est utilisé qu’en accent, pas comme fond
- Le dark mode repose sur `bg-gray-900`, `text-white`, `border-gray-*`
- Le logo `cyna` reste visible en toutes conditions (`text-primary`, `dark:text-primary`)
- Bordures et ombrages légers (`shadow-md`, `border-t`) pour hiérarchiser visuellement sans alourdir

---

##  Tests réalisés

| Écran                 | Résultat                                           |
| --------------------- | -------------------------------------------------- |
| ≥ 1280px              | Navbar full links + texte visible                  |
| 1024px – 1279px       | Navbar texte compressé, mais visible (`lg:inline`) |
| < 1024px              | Passage au menu burger, liens repliés              |
| Mobile                | Menu déroulant propre, sans chevauchement          |
| Dark mode             | Support complet (header, navbar, footer, inputs)   |
| Accessibilité clavier | OK (`tab`, `focus-visible`)                        |
| Responsive search bar | OK (`max-w`, overflow-hidden)                      |

---

##  Limites / axes d’amélioration

- Le footer est masqué sur mobile (`hidden sm:flex`) – UX à revoir si nécessaire
- Le menu mobile pourrait être enrichi avec un avatar utilisateur
- Le sticky header n’est pas encore activé (prévu dans un sprint ultérieur)
- Les URLs réseaux sociaux sont codées en dur (non externalisées)

---

##  Suggestions futures

- Centraliser les constantes de routes et labels dans un fichier de config
- Ajouter des animations au `MobileMenu` (ex : slide)
- Détecter le `prefers-color-scheme` système pour initialiser le dark mode
- Ajouter un avatar utilisateur avec menu contextuel

---

````
