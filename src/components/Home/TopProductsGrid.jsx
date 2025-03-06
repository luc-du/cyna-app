import { MOCK_Services } from "../../mock/MOCKS_DATA";
import ProductCard from "./ProductCard";

const TopProductsGrid = () => {
  return (
    <section className="w-full py-10 px-6 rounded-lg md:px-20 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Les Top Produits du moment
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez les solutions les plus demandées par nos clients.
      </p>

      {/* Ajout d'un function random utile ou pas ? */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {MOCK_Services.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopProductsGrid;
