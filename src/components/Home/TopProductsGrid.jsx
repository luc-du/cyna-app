import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../../redux/slice/topProductsSlice";
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

  return (
    <section
      className="w-full py-10 px-6 rounded-lg md:px-20 bg-gray-100"
      aria-labelledby="top-products-heading"
      aria-describedby="top-products-desc"
      role="region"
      tabIndex={-1}
    >
      <h2
        id="top-products-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground"
        tabIndex={-1}
      >
        Les Top Produits du moment
      </h2>
      <p id="top-products-desc" className="text-center text-gray-600 mt-2">
        Découvrez les solutions les plus demandées par nos clients.
      </p>

      {loading && (
        <p
          className="text-center text-blue-500 mt-4"
          role="status"
          aria-live="polite"
        >
          Chargement...
        </p>
      )}
      {error && (
        <p
          className="text-center text-red-500 mt-4"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        role="list"
        aria-label="Liste des top produits"
        tabIndex={0}
      >
        {topProducts.map((product) => (
          <div
            role="listitem"
            key={product.id}
            aria-label={`Produit: ${product.name}`}
            tabIndex={0}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
