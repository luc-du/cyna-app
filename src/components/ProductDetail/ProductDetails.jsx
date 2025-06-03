// src/components/ProductDetail/ProductDetails.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/slice/productSlice";
import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

/**
 * ProductDetails :
 * - Récupère le productId depuis les params de l’URL.
 * - Lance fetchProductById(productId) si besoin.
 * - Affiche :
 *   1) Un message “Chargement…” pendant la requête.
 *   2) Une redirection vers /404 si l’API renvoie une erreur ou si le produit reste null après chargement.
 *   3) Sinon, le détail complet du produit.
 *
 * Accessibilité :
 * - role="main" sur le conteneur principal.
 * - Chaque section a son aria-label / aria-labelledby.
 * - Les titres <h2> sont rendus “sr-only” pour les lecteurs d’écran.
 */
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // On récupère item/loading/error depuis le slice product
  const {
    item: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Si pas encore chargé ou si l’ID a changé, on déclenche la requête
  useEffect(() => {
    if (!product || product.id !== Number(productId)) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  // 1) Tant que ça charge : on affiche un loader
  if (loading) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600"
        >
          Chargement du produit...
        </p>
      </main>
    );
  }

  // 2) Si l’API a renvoyé une erreur (y compris 404 côté backend) : on redirige vers /404
  if (error) {
    return <Navigate to="/404" replace />;
  }

  // 3) Une fois la requête terminée (loading false + pas d’erreur), si product est toujours null :
  //    cela signifie “Produit introuvable” ⇒ on redirige vers /404
  if (!product) {
    return <Navigate to="/404" replace />;
  }

  // 4) Sinon, le produit est bien récupéré : on affiche son détail
  return (
    <main
      role="main"
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8"
      aria-labelledby="product-title"
    >
      {/* Titre caché pour les lecteurs d’écran */}
      <h1 id="product-title" className="sr-only">
        Détails du produit {product.name}
      </h1>

      {/* Carousel d’images */}
      <section aria-label="Galerie d’images du produit" className="mb-8">
        <ProductCarousel
          images={product.images?.map((img) => img.url) || []}
          delayTransitionImage={5000}
        />
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

      {/* Call to Action pour acheter / s’abonner */}
      <section aria-labelledby="product-cta-heading" className="mb-8">
        <h2 id="product-cta-heading" className="sr-only">
          Action principale
        </h2>
        <ProductCTA product={product} />
      </section>
    </main>
  );
};

export default ProductDetails;
