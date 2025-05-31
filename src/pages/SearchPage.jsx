import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ProductCard from "../components/Home/ProductCard";
import EmptyState from "../components/ui/EmptyState";
import Loader from "../components/ui/Loader";

export default function SearchPage() {
  const { query, filtered, status, error } = useSelector(
    (state) => state.search
  );

  if (status === "loading")
    return <Loader aria-label="Chargement des résultats" />;

  if (error) {
    return (
      <div
        className="text-center mt-10 text-red-600"
        role="alert"
        aria-live="assertive"
      >
        Une erreur est survenue lors du chargement des produits.
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-8"
      aria-labelledby="search-results-heading"
    >
      <h2
        id="search-results-heading"
        className="text-2xl font-bold mb-4"
        tabIndex={-1}
      >
        Résultats pour : « {query} »
      </h2>

      {filtered.length === 0 && query.trim() !== "" ? (
        <EmptyState message="Aucun produit ne correspond à votre recherche." />
      ) : (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Liste des produits"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};
