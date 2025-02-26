import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductDetail/ProductCarousel";
import ProductCTA from "../components/ProductDetail/ProductCTA";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductSpecs from "../components/ProductDetail/ProductSpecs";
import SimilarProducts from "../components/ProductDetail/SimilarProducts";
import { MOCK_TopProductsData } from "../mock/MOCK_Top_Products";

const ProductDetails = () => {
  const { productId } = useParams();
  const productIdToNumber = parseInt(productId);

  const product = MOCK_TopProductsData.find(
    (product) => product.id === productIdToNumber
  );

  if (!product) {
    return <p>Produit non trouvé ⁉️</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 1. Carrousel d'illustration 🎠 */}
      <ProductCarousel images={product.image} delayTransitionImage={5000} />

      {/* 2.Informations produit 📰 */}
      <ProductInfo product={"product"} />

      {/* 3.Carac. techniques 🕹️ */}
      <ProductSpecs product={"product"} />

      {/* 4.CTA ajout au panier 🛒 */}
      <ProductCTA product={"product"} />

      {/* 5.Services similaires */}
      <SimilarProducts currentProductId={"product.Id"} />
    </div>
  );
};

export default ProductDetails;
