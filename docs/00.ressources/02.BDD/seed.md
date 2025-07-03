---

## 1. Préambule

1. **Vérifiez que votre backend tourne** sur les ports indiqués (8082 pour les microservices “carousel”, “categories” et “products”).
2. Ajustez les URL (si votre proxy ou vos ports diffèrent).
3. Vous utiliserez les endpoints “POST” suivants :

   - **Carousel** : `POST http://localhost:8082/api/v1/carousel`
   - **Categories** : `POST http://localhost:8082/api/v1/categories`
   - **Products** : `POST http://localhost:8082/api/v1/products`

Les payloads JSON ci-dessous respectent les schémas Swagger correspondants.

---

## 2. Insérer des slides dans le Carousel

> **Schéma attendu (`Carousel`)** :
>
> ```json
> {
>   "id": <integer>,
>   "title": "<string>",
>   "text": "<string>"
> }
> ```
>
> (Le backend générera l’ID si vous ne l’envoyez pas.)

### Exemples de requêtes `curl`

```bash
# Slide 1
curl -X POST http://localhost:8082/api/v1/carousel \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle Offre Cybersecurity 2025",
    "text": "Profitez de -30% sur tous nos services SOC & EDR jusqu’au 31 mai."
}'

# Slide 2
curl -X POST http://localhost:8082/api/v1/carousel \
  -H "Content-Type: application/json" \
  -d '{
    "title": "XDR Avancé Disponible",
    "text": "Découvrez notre nouvelle solution XDR avec détection en temps réel."
}'

# Slide 3
curl -X POST http://localhost:8082/api/v1/carousel \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Formation Sécurité Cloud",
    "text": "Inscrivez-vous à notre webinar gratuit sur la sécurisation AWS et Azure."
}'
```

> Après exécution, vérifiez avec
>
> ```bash
> curl http://localhost:8082/api/v1/carousel
> ```
>
> que vos slides sont bien créés.

---

## 3. Insérer des Categories

> **Schéma attendu (`CategoryDto`)** :
>
> ```json
> {
>   "id": <integer>,       // optionnel : si omis, le backend génèrera l’ID
>   "name": "<string>",
>   "description": "<string>",
>   "images": [<fichiers binaires>]   // (dans notre cas on peut omettre ou envoyer une URL plus tard)
> }
> ```
>
> Pour simplifier, on n’enverra pas la propriété `images` en binaire ici (upload d’images se fait via PATCH plus tard).

### Exemples de requêtes `curl`

```bash
# Catégorie 1 : SOC & SIEM
curl -X POST http://localhost:8082/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SOC & SIEM",
    "description": "Surveillance et gestion des événements de sécurité en temps réel."
}'

# Catégorie 2 : EDR & XDR
curl -X POST http://localhost:8082/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "EDR & XDR",
    "description": "Protection avancée des endpoints et réponse aux menaces étendues."
}'

# Catégorie 3 : CYNA SOC
curl -X POST http://localhost:8082/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CYNA SOC",
    "description": "Solution SOC cloud-native avec intelligence artificielle intégrée."
}'
```

> Vérifiez ensuite la liste avec
>
> ```bash
> curl http://localhost:8082/api/v1/categories
> ```
>
> Vous devriez voir vos trois catégories créées.

---

## 4. Insérer des Produits

> **Schéma attendu (`ProductDto`)** :
>
> ```json
> {
>   "name": "<string>",
>   "brand": "<string>",
>   "description": "<string>",
>   "caracteristics": "<string>",
>   "pricingModel": "<string>",         // ex. "PER_MONTH_PER_USER", "PER_YEAR_PER_USER", ...
>   "amount": <integer>,                // ex. 29, prix en unité monétaire (EUR cents par ex.)
>   "categoryId": <integer>,            // correspond à l’ID d’une catégorie existante
>   "status": "<string>",               // "AVAILABLE", "DISCONTINUED", "OUT_OF_STOCK"
>   "active": <boolean>,
>   "promo": <boolean>
> }
> ```
>
> On omet volontairement `images` ici, on pourra les ajouter via le endpoint `/products/{productId}/images` s’il y a besoin plus tard.

### Exemples de requêtes `curl`

```bash
# Produit 1 : SOC Standard (catégorie 1)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SOC Standard",
    "brand": "CYNA",
    "description": "Surveillance continue 24/7 avec alertes en temps réel.",
    "caracteristics": "Basique, BI & Dashboard",
    "pricingModel": "PER_MONTH_PER_USER",
    "amount": 2999,
    "categoryId": 1,
    "status": "AVAILABLE",
    "active": true,
    "promo": false
}'

# Produit 2 : SOC Premium (catégorie 1, promo active)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SOC Premium",
    "brand": "CYNA",
    "description": "Analyse avancée, réponse automatisée et support prioritaire.",
    "caracteristics": "Machine Learning, Intelligence Artificielle",
    "pricingModel": "PER_YEAR_PER_USER",
    "amount": 29999,
    "categoryId": 1,
    "status": "AVAILABLE",
    "active": true,
    "promo": true
}'

# Produit 3 : EDR Protection (catégorie 2)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "EDR Protection",
    "brand": "CYNA",
    "description": "Détection des menaces en temps réel sur vos terminaux.",
    "caracteristics": "Antivirus, Sandbox, RAPID response",
    "pricingModel": "PER_MONTH_PER_USER",
    "amount": 1999,
    "categoryId": 2,
    "status": "AVAILABLE",
    "active": true,
    "promo": false
}'

# Produit 4 : XDR Advanced (catégorie 2, promo active)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "XDR Advanced",
    "brand": "CYNA",
    "description": "Orchestration centralisée des alertes de sécurité sur l’infrastructure entière.",
    "caracteristics": "SIEM + EDR + UEBA intégrés",
    "pricingModel": "PER_YEAR_PER_USER",
    "amount": 39999,
    "categoryId": 2,
    "status": "AVAILABLE",
    "active": true,
    "promo": true
}'

# Produit 5 : CYNA SOC Standard (catégorie 3)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CYNA SOC Standard",
    "brand": "CYNA",
    "description": "SOC cloud-native avec prise en charge 24/7",
    "caracteristics": "Scalabilité, multi-tenant",
    "pricingModel": "PER_MONTH_PER_USER",
    "amount": 4999,
    "categoryId": 3,
    "status": "AVAILABLE",
    "active": true,
    "promo": false
}'

# Produit 6 : CYNA SOC Entreprise (catégorie 3, sur devis)
curl -X POST http://localhost:8082/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CYNA SOC Entreprise",
    "brand": "CYNA",
    "description": "Solution sur mesure pour grandes entreprises, tarification sur demande.",
    "caracteristics": "Personnalisation, SLA garanti",
    "pricingModel": "PAY_AS_YOU_GO",
    "amount": 0,
    "categoryId": 3,
    "status": "AVAILABLE",
    "active": true,
    "promo": false
}'
```

> **Remarque** : pour `amount: 0` + `pricingModel: "PAY_AS_YOU_GO"`, vous pouvez indiquer un prix “sur demande” dans votre UI (backend renverra 0 ou un champ spécial dans le schéma).

Après ces requêtes, vous pouvez vérifier l’injection en appelant :

```bash
curl http://localhost:8082/api/v1/products
```

ou pour filtrer les top produits (promo + active) :

```bash
curl "http://localhost:8082/api/v1/products/top-products?top=8&promo=true&active=true"
```

Vous devriez voir les produits “SOC Premium” et “XDR Advanced” présents.

---

## 5. Vérifier en une seule fois

Vous pouvez ensuite passer en revue les trois collections séparément :

```bash
# 1. Carousel
curl http://localhost:8082/api/v1/carousel

# 2. Categories
curl http://localhost:8082/api/v1/categories

# 3. Produits
curl http://localhost:8082/api/v1/products
```

Si chaque résultat renvoie la liste créée ci-dessus, cela signifie que votre backend est correctement peuplé et prêt à répondre aux appels GET de la HomePage.

---

## 6. Étapes suivantes pour le front

1. **CarouselContainer** continuera d’utiliser `GET /api/v1/carousel`.
2. **CategoriesGrid** utilisera `GET /api/v1/categories`.
3. **TopProductsGrid** utilisera `GET /api/v1/products/top-products?top=8&promo=true&active=true`.
4. Vous pourrez maintenant implémenter / tester la page produit via `GET /api/v1/products/{productId}` lorsque l’utilisateur cliquera sur “Voir le produit”.

---

### En résumé

- Exécutez les requêtes `curl` fournies pour insérer des données de test.
- Vérifiez ensuite via `curl GET` que tout est en place.
- Votre front peut maintenant consommer ces endpoints en condition réelle.

Profitez bien de votre backlog !
