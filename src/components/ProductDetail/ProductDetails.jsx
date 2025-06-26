import DataStatus from "@shared/DataStatus";
import NoResult from "@shared/NoResult";
import { fetchProductById } from "@slices/productSlice";
import { placeHolder } from "@utils/indexImages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
/**
 * ProductDetails
 * Affiche la fiche détaillée d’un produit.
 * Récupère les données depuis l’API ou utilise un fallback depuis les mocks.
 */
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    item: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  const parsedId = Number(productId);
  const isValidId = !isNaN(parsedId) && parsedId > 0;

  useEffect(() => {
    if (isValidId && (!product || String(product.id) !== productId)) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, isValidId, product]);

  // Fallback mock
  const fallbackProduct = MOCK_SERVICES.find(
    (p) => String(p.id) === String(productId)
  );
  const finalProduct = product ?? fallbackProduct;

  // Redirection : ID invalide ou aucune donnée
  if (!isValidId || (!loading && error && !finalProduct)) {
    return <Navigate to="/404" replace />;
  }

  // Loader initial sans fallback
  if (loading && !fallbackProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6 flex justify-center">
        <DataStatus loading={true} error={null} dataLength={0} />
      </main>
    );
  }

  // Erreur persistante
  if (!loading && error && !finalProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <DataStatus loading={false} error={error} dataLength={0} />
      </main>
    );
  }

  // Produit introuvable même avec fallback
  if (!finalProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <NoResult message="Produit introuvable." image={placeHolder} />
      </main>
    );
  }

  // Rendu principal
  return (
    <div
      role="region"
      className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white border-gray-700 rounded-lg shadow-lg space-y-8 transition-colors duration-300"
      aria-labelledby="product-title"
    >
      <h1 id="product-title" className="sr-only">
        Détails du produit {finalProduct.name}
      </h1>

      {/* Galerie d'images */}
      <section aria-label="Galerie d'images du produit">
        <div className="w-full flex items-center h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <ProductCarousel
            images={
              finalProduct.images?.length > 0
                ? finalProduct.images.map((img) => img.url)
                : [placeHolder, placeHolder, placeHolder]
            }
            fixedHeight="h-full"
            delayTransitionImage={5000}
          />
        </div>
      </section>

      {/* Informations principales */}
      <section aria-labelledby="product-info-heading">
        <h2 id="product-info-heading" className="sr-only">
          Informations sur {finalProduct.name}
        </h2>
        <ProductInfo product={finalProduct} />
      </section>

      {/* Spécifications techniques */}
      <section aria-labelledby="product-specs-heading">
        <h2 id="product-specs-heading" className="sr-only">
          Spécifications techniques
        </h2>
        <ProductSpecs product={finalProduct} />
      </section>

      {/* Appel à l'action */}
      <section aria-labelledby="product-cta-heading">
        <h2 id="product-cta-heading" className="sr-only">
          Action principale
        </h2>
        <ProductCTA product={finalProduct} />
      </section>
    </div>
  );
};

export default ProductDetails;
