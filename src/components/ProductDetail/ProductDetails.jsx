import { useParams } from "react-router-dom";
import useFindById from "../../hooks/useFindById";
import { MOCK_TopProductsData } from "../../mock/MOCK_Top_Products";
import AddToCartButton from "../ui/buttons/AddToCartButton";
import ProductCarousel from "./ProductCarousel";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./SimilarProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const productIdToNumber = parseInt(productId);

  const product = useFindById(productIdToNumber, MOCK_TopProductsData);

  if (!product) {
    return <p>Produit non trouvé ⁉️</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 1. Carrousel d'illustration 🎠 */}
      <ProductCarousel images={product.image} delayTransitionImage={5000} />

      {/* 2.Informations produit 📰 */}
      <ProductInfo product={product} />

      {/* 3.Carac. techniques 🕹️ */}
      <ProductSpecs product={product} />

      {/* 4.CTA ajout au panier 🛒 */}
      <AddToCartButton product={product} />

      {/* 5. Prix des services  */}
      <ProductPricing product={product} />

      {/* 6.Services similaires */}
      <SimilarProducts similar={product.similar} />
    </div>
  );
};

export default ProductDetails;
