import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_Services } from "../../mock/MOCKS_DATA";
import ProductCard from "./ProductCard";

const TopProductsGrid = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(API_ROUTES.PRODUCTS.TOP_PRODUCTS);

        const formattedProducts = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          imageUrl:
            product.images?.[0] || "/assets/images/placeholder-product.jpg",
          link: `/products/${product.id}`,
        }));

        setTopProducts(formattedProducts);
      } catch (err) {
        console.warn("Fallback mock pour les Top produits :", err);
        const fallback = MOCK_Services.slice(0, 4).map((p) => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          link: `/products/${p.id}`,
        }));
        setTopProducts(fallback);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <section className="w-full py-10 px-6 rounded-lg md:px-20 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Les Top Produits du moment
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez les solutions les plus demandées par nos clients.
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {topProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
