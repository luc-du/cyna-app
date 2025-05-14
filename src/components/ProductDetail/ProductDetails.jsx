import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../redux/slice/categorySlice";

import ProductCarousel from "./ProductCarousel";
import ProductCTA from "./ProductCTA";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductSpecs from "./ProductSpecs";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const allProducts = useSelector((state) =>
    state.categories.categories.flatMap((cat) => cat.products || [])
  );

  const product = allProducts.find((p) => p.id === parseInt(productId, 10));

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts()); // au cas où on veut charger indépendamment
    }
  }, [allProducts.length, dispatch]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center">Produit non trouvé ⁉️</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ProductCarousel
        images={product.images.map((img) => img.url)}
        delayTransitionImage={5000}
      />
      <ProductInfo product={product} />
      <ProductSpecs product={product} />
      <ProductCTA product={product} />
      <ProductPricing product={product} />
    </div>
  );
};

export default ProductDetails;
