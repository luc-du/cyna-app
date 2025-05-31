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
    <section className="w-full py-10 px-6 rounded-lg md:px-20 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Les Top Produits du moment
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez les solutions les plus demandées par nos clients.
      </p>

      {loading && (
        <p className="text-center text-blue-500 mt-4">Chargement...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {topProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
