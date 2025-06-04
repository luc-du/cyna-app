import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
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

  // 🔐 Sécurisation en amont (hook = toujours au top)
  const parsedId = Number(productId);

  useEffect(() => {
    if (!product || Number(product.id) !== parsedId) {
      dispatch(fetchProductById(parsedId));
    }
  }, [dispatch, parsedId, product]);

  // ⛔ Retour anticipé = uniquement après les hooks
  if (!productId || isNaN(parsedId)) {
    return <Navigate to="/404" replace />;
  }

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

  if (error || !product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main
      role="main"
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8"
      aria-labelledby="product-title"
    >
      <h1 id="product-title" className="sr-only">
        Détails du produit {product.name}
      </h1>

      <section aria-label="Galerie d’images du produit" className="mb-8">
        <ProductCarousel
          images={product.images?.map((img) => img.url) || []}
          delayTransitionImage={5000}
        />
      </section>

      <section aria-labelledby="product-info-heading" className="mb-8">
        <h2 id="product-info-heading" className="sr-only">
          Informations sur {product.name}
        </h2>
        <ProductInfo product={product} />
      </section>

      <section aria-labelledby="product-specs-heading" className="mb-8">
        <h2 id="product-specs-heading" className="sr-only">
          Spécifications techniques
        </h2>
        <ProductSpecs product={product} />
      </section>

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
