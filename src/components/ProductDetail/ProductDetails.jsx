import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { placeHolder } from "../../assets/indexImages";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import { fetchProductById } from "../../redux/slice/productSlice";
import Loader from "../ui/Loader";
import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // On lit maintenant dans state.products (clé du store)
  const {
    item: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Validation du param ID (filtrer les cas invalides)
  const parsedId = Number(productId);
  const isValidId = !isNaN(parsedId) && parsedId > 0;

  // Appel à l'API si besoin
  useEffect(() => {
    if (isValidId) {
      // Si pas encore de produit ou si ce n'est pas le bon ID
      if (!product || String(product.id) !== String(productId)) {
        console.log("Dispatch fetchProductById pour ID =", productId);
        dispatch(fetchProductById(productId));
      }
    }
  }, [dispatch, productId, isValidId, product]);

  // Fallback local en cas d’erreur réseau ou produit non trouvé
  const fallbackProduct = MOCK_SERVICES.find(
    (p) => String(p.id) === String(productId)
  );

  // On affiche d’abord le produit BE s’il existe, sinon le fallback
  const finalProduct = product ?? fallbackProduct;

  if (!isValidId || (!loading && error && !finalProduct)) {
    return <Navigate to="/404" replace />;
  }

  // Afficher un loader tant qu’on n’a ni produit BE ni fallback
  if (loading && !finalProduct) {
    return (
      <main role="main" className="max-w-6xl mx-auto p-6">
        <Loader
          message={
            <p
              role="status"
              aria-live="polite"
              className="text-center text-gray-600"
            >
              Chargement du produit...
            </p>
          }
        />
      </main>
    );
  }

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

      {/* Carousel d’images */}
      <section aria-label="Galerie d'images du produit" className="mb-8">
        <ProductCarousel
          images={finalProduct.images?.map((img) => img.url) || [placeHolder]}
          delayTransitionImage={5000}
        />
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
