import { useParams } from "react-router-dom";
import { indexImages } from "../../assets/indexImages";
import useFindById from "../../hooks/useFindById";
import { MOCK_Services } from "../../mock/MOCKS_DATA";
import AddToCartButton from "../ui/buttons/AddToCartButton";
import ProductCarousel from "./ProductCarousel";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./SimilarProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const serviceIdToNumber = parseInt(productId);

  const service = useFindById(serviceIdToNumber, MOCK_Services);

  if (!service) {
    return <p>Produit non trouvé ⁉️</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 1. Carrousel d'illustration 🎠 */}
      <ProductCarousel images={indexImages} delayTransitionImage={5000} />

      {/* 2.Informations produit 📰 */}
      <ProductInfo product={service} />

      {/* 3.Carac. techniques 🕹️ */}
      <ProductSpecs product={service} />

      {/* 4.CTA ajout au panier 🛒 */}
      <AddToCartButton product={service} />

      {/* 5. price des services  */}
      <ProductPricing product={service} />

      {/* 6.Services similaires */}
      <SimilarProducts similar={service.similar} />
    </div>
  );
};

export default ProductDetails;
