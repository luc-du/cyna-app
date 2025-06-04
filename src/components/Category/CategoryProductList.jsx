import PropTypes from "prop-types";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import ProductCard from "../Home/ProductCard";
/**
 * Affiche les produits d'une catégorie, en mode hybride (backend ou mock)
 */
const CategoryProductList = ({ element }) => {
  // Gestion sécurité
  if (!element) return null;

  const servicesIds = element.services ?? [];

  // Si la catégorie vient du backend avec un champ `products` directement intégré
  const fromBackend =
    Array.isArray(element.products) && element.products.length > 0;

  const resolvedProducts = fromBackend
    ? element.products
    : MOCK_SERVICES.filter((service) => servicesIds.includes(service.id));

  if (!resolvedProducts.length) {
    return (
      <p className="text-center mt-6 text-gray-500">
        Aucun produit ou service associé à cette catégorie.
      </p>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Produits associés
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resolvedProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
};

CategoryProductList.propTypes = {
  element: PropTypes.object,
};

export default CategoryProductList;
