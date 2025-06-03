// src/components/ProductDetail/ProductDetails.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/slice/productSlice";
import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductSpecs from "./ProductSpecs";

/**
 * ProductDetails
 *
 * - Récupère `productId` depuis les paramètres d’URL.
 * - Charge (via Redux) le détail du produit en appelant `fetchProductById`.
 * - Tant que l’appel est en cours, affiche un loader.
 * - En cas d’erreur, affiche un message d’erreur.
 * - Si aucun produit n’est trouvé (donnée `item` restée `null`), affiche « Produit non trouvé ».
 *
 * Accessibilité & ARIA :
 * - Le conteneur principal utilise `role="main"`.
 * - Chaque section (carousel, info, specs…) possède un `aria-label` ou un titre caché (`sr-only`).
 */
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    item: product,
    loadingItem: loading,
    errorItem: error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, product, productId]);

  // Affiche un loader pendant la requête
  if (loading) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <p role="status" className="text-center text-gray-600">
          Chargement du produit...
        </p>
      </main>
    );
  }

  // Si une erreur est survenue
  if (error) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <p role="alert" className="text-center text-red-500">
          {error}
        </p>
      </main>
    );
  }

  // Si, après chargement, aucun produit n’a été trouvé
  if (!product) {
    return (
      <main
        role="main"
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-center">Produit non trouvé ⁉️</h2>
      </main>
    );
  }

  // À ce stade, `product` est disponible et contient au moins un tableau `images`
  const imageUrls = Array.isArray(product.images)
    ? product.images.map((img) => img.url)
    : [];

  return (
    <main
      role="main"
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      aria-labelledby="product-title"
    >
      {/* Titre caché pour lecteurs d’écran */}
      <h1 id="product-title" className="sr-only">
        Détails du produit : {product.name}
      </h1>

      {/* Carousel d’images */}
      <section aria-label="Galerie d’images du produit" className="mb-8">
        {/* Si `imageUrls` est vide, le carousel affiche un placeholder interne */}
        <ProductCarousel images={imageUrls} delayTransitionImage={5000} />
      </section>

      {/* Informations principales du produit */}
      <section aria-labelledby="product-info-heading" className="mb-8">
        <h2 id="product-info-heading" className="sr-only">
          Informations sur {product.name}
        </h2>
        <ProductInfo product={product} />
      </section>

      {/* Spécifications techniques */}
      <section aria-labelledby="product-specs-heading" className="mb-8">
        <h2 id="product-specs-heading" className="sr-only">
          Spécifications techniques
        </h2>
        <ProductSpecs product={product} />
      </section>

      {/* Call to Action pour achat / abonnement */}
      <section aria-labelledby="product-cta-heading" className="mb-8">
        <h2 id="product-cta-heading" className="sr-only">
          Action principale
        </h2>
        <ProductCTA product={product} />
      </section>

      {/* Options de tarification */}
      <section aria-labelledby="product-pricing-heading">
        <h2 id="product-pricing-heading" className="sr-only">
          Options de tarification
        </h2>
        <ProductPricing product={product} />
      </section>
    </main>
  );
};

export default ProductDetails;
