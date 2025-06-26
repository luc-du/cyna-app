import DataStatus from "@shared/DataStatus";
import { fetchTopProducts } from "@slices/topProductsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const TopProductsGrid = () => {
  const dispatch = useDispatch();
  const {
    items: topProducts,
    loading,
    error,
  } = useSelector((state) => state.topProducts);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  const safeTopProducts = Array.isArray(topProducts) ? topProducts : [];

  return (
    <section
      className="w-full py-10 px-6 md:px-20 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 rounded-2xl dark:border-gray-700 transition-colors duration-300"
      aria-labelledby="top-products-heading"
      aria-describedby="top-products-desc"
      role="region"
      tabIndex={-1}
    >
      {" "}
      <h2
        id="top-products-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground dark:text-white"
        tabIndex={-1}
      >
        Les Top Produits du moment
      </h2>
      <p
        id="top-products-desc"
        className="text-center text-gray-600 dark:text-gray-300 mt-2"
      >
        Découvrez les solutions les plus demandées par nos clients.
      </p>
      <DataStatus
        loading={loading}
        error={error}
        dataLength={safeTopProducts.length}
      />
      <div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-colors duration-300"
        role="list"
        aria-label="Liste des top produits"
        tabIndex={0}
      >
        {safeTopProducts.map((product) => (
          <div
            role="listitem"
            key={product.id}
            aria-label={`Produit : ${product.name}`}
            tabIndex={0}
          >
            <ProductCard product={product} linkTo={`/products/${product.id}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
