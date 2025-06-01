# **Note technique à destination de l'équipe backend – rendu des avatars utilisateurs**

##Problème constaté :

- L’upload d’un avatar fonctionne correctement
- L’URL générée (`/auth-users/<filename>.png`) est bien renvoyée dans le champ `urlProfile`
- En revanche, **le frontend ne parvient pas à charger l’image** : erreur `403 Forbidden` lors de la requête GET

###Exemple :

```http
GET http://localhost:8080/auth-users/my_avatar-300300.png → 403 Forbidden
```

---

#### Analyse :

- Le `api-gateway` contient bien une route `Path=/auth-users/**` vers `file:///...`
- **Mais cette route est contournée/écrasée** par le routeur automatique de Spring Cloud Gateway via Eureka (`discovery.locator.enabled: true`)
- Le backend `auth-users` ne dispose **d’aucun contrôleur ou handler statique** pour servir des fichiers depuis `/images/`

---

#### Recommandation backend :

**Deux solutions techniques sont possibles, au choix selon l’architecture cible :**

---

**1. Activer un `ResourceHandler` dans `auth-users` :**

```java
registry.addResourceHandler("/auth-users/**")
        .addResourceLocations("file:" + imagesPath + "/");
```

🔹 Permet de servir directement les fichiers depuis `auth-users`, comme c’est déjà le cas côté `products`.

---

**2. Servir les fichiers via le Gateway :**
🔸 Désactiver l’autodiscovery (`discovery.locator.enabled: false`)
🔸 Laisser la route suivante dans `application.yml` :

```yaml
- id: static-images
  uri: file:///C:/.../cyna-backend/images/
  predicates:
    - Path=/auth-users/**
  filters:
    - StripPrefix=1
```

Solution propre si l’on souhaite centraliser l’exposition de fichiers statiques via la Gateway.

---

**En l’état, aucune de ces deux solutions n’est en place**, d’où l’erreur actuelle `403`.
À corriger côté `auth-users` ou `api-gateway`, selon l’architecture souhaitée.

---
