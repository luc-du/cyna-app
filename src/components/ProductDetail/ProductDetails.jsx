import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import { fetchProductById } from "../../redux/slice/productSlice";
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

  // Validation du param ID (juste pour filtrer les cas manifestement invalides)
  const parsedId = Number(productId);
  const isValidId = !isNaN(parsedId) && parsedId > 0;

  // Appel à l'API ou fallback
  useEffect(() => {
    if (isValidId) {
      // Vérifie si le produit est déjà celui attendu
      if (!product || String(product.id) !== String(productId)) {
        dispatch(fetchProductById(productId));
      }
    }
  }, [dispatch, productId, isValidId, product]);

  // Fallback local en cas d'erreur ou de produit null après appel
  const fallbackProduct = MOCK_SERVICES.find(
    (p) => String(p.id) === String(productId)
  );

  const finalProduct = product ?? fallbackProduct;

  console.log("From productDetail", finalProduct);

  // Redirection 404 si rien à afficher
  if (!isValidId || (!loading && error && !finalProduct)) {
    return <Navigate to="/404" replace />;
  }

  if (loading && !finalProduct) {
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
          images={finalProduct.images?.map((img) => img.url) || []}
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
