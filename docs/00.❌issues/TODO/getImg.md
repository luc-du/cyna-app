Voici deux manières de « proxyfier » l’affichage de ton avatar protégé :

---

## 1. (Dev-only) Proxy Vite pour simplifier l’URL

Si tu utilises Vite, tu peux configurer le dev-server pour rediriger toutes les requêtes commençant par `/auth-users` vers ton backend `http://localhost:8080` :

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth-users": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/auth-users/, "/auth-users")
      },
    },
  },
});
```

**Comment l’utiliser**
Dans ton composant React, remplace :

```jsx
<img src={user.urlProfile} alt="Avatar" />
```

par

```jsx
<img src={user.urlProfile.replace("http://localhost:8080", "")} alt="Avatar" />;
{
  /* ex: /auth-users/my_avatar-300300.png */
}
```

et le dev-server fera passer la requête pour toi.

> **Limite** : tu ne pourras toujours pas envoyer le header `Authorization` automatiquement.

---

## 2. Le vrai « proxy » avec fetch+blob (fonctionne aussi en prod)

Crée un petit composant `<AuthImage>` qui :

1. Récupère le JWT depuis ton storage
2. Fetch-e l’image en mode `fetch` (avec header)
3. Convertit la réponse en `blob`
4. Génère un `objectURL` pour l’`<img>`

```jsx
// src/components/shared/AuthImage.jsx
import { useState, useEffect } from "react";
import { getToken } from "../utils/authStorage";

export default function AuthImage({ src, alt, ...props }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = getToken();
        const res = await fetch(src, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const blob = await res.blob();
        if (!cancelled) setDataUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error("AuthImage fetch failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!dataUrl)
    return <div style={{ width: 64, height: 64, background: "#efefef" }} />;
  return <img src={dataUrl} alt={alt} {...props} />;
}
```

**Utilisation dans ton profil**

```jsx
import AuthImage from "../components/shared/AuthImage";

function ProfileHeader({ user, onAvatarUpload }) {
  return (
    <div>
      <AuthImage
        src={user.urlProfile} // http://localhost:8080/auth-users/…
        alt="Avatar"
        className="w-16 h-16 rounded-full"
      />
      {/* … */}
    </div>
  );
}
```

> **Avantages** :
>
> - Le header `Authorization` est bien envoyé.
> - Fonctionne en dev **et** en prod, sans modifier le backend.

---

Choisis la solution qui te convient :

- **Proxy Vite** si tu veux juste du dev-only rapide,
- **`AuthImage`** pour une vraie prise en charge partout.
