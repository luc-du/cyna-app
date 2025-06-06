import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { placeHolder } from "../../assets/indexImages";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import { fetchProductById } from "../../redux/slice/productSlice";
import DataStatus from "../shared/DataStatus";
import NoResult from "../shared/NoResult";
import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

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

  // Fallback vers le mock si pas trouvé
  const fallbackProduct = MOCK_SERVICES.find(
    (p) => String(p.id) === String(productId)
  );
  const finalProduct = product ?? fallbackProduct;

  // Redirection si ID invalide ou erreur sans fallback
  if (!isValidId || (!loading && error && !finalProduct)) {
    return <Navigate to="/404" replace />;
  }

  // Si on charge *et* qu’il n’y a pas encore de fallback, loader plein écran
  if (loading && !fallbackProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6 flex justify-center">
        <DataStatus loading={true} error={null} dataLength={0} />
      </main>
    );
  }

  // Si post-charge, erreur persistante (DataStatus)
  if (!loading && error && !finalProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <DataStatus loading={false} error={error} dataLength={0} />
      </main>
    );
  }

  // Si produit final inexistant (pas même de mock), on affiche NoResult
  if (!finalProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <NoResult message="Produit introuvable." image={placeHolder} />
      </main>
    );
  }

  // Sinon on affiche les détails
  return (
    <main
      role="main"
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8"
      aria-labelledby="product-title"
    >
      {finalProduct && (
        <h1 id="product-title" className="sr-only">
          Détails du produit {finalProduct.name}
        </h1>
      )}

      <section aria-label="Galerie d'images du produit" className="mb-8">
        <div className="w-full flex items-center h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-100">
          <ProductCarousel
            images={
              finalProduct.images && finalProduct.images.length > 0
                ? finalProduct.images.map((img) => img.url)
                : [placeHolder, placeHolder, placeHolder]
            }
            fixedHeight="h-full"
            delayTransitionImage={5000}
          />
        </div>
      </section>

      {/* Informations principales */}
      <section aria-labelledby="product-info-heading" className="mb-8">
        <h2 id="product-info-heading" className="sr-only">
          Informations sur {finalProduct.name}
        </h2>
        <ProductInfo product={finalProduct} />
      </section>

      {/* Spécifications */}
      <section aria-labelledby="product-specs-heading" className="mb-8">
        <h2 id="product-specs-heading" className="sr-only">
          Spécifications techniques
        </h2>
        <ProductSpecs product={finalProduct} />
      </section>

      {/* CTA */}
      <section aria-labelledby="product-cta-heading" className="mb-8">
        <h2 id="product-cta-heading" className="sr-only">
          Action principale
        </h2>
        <ProductCTA product={finalProduct} />
      </section>
    </main>
  );
};

export default ProductDetails;
