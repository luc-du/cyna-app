import DataStatus from "@shared/DataStatus";
import NoResult from "@shared/NoResult";
import { placeHolder } from "@utils/indexImages";
import PropTypes from "prop-types";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import ProductCard from "../Home/ProductCard";
import sortProductsByPriority from "../utils/sortProductByPriority";

/**
 * Composant : CategoryProductList
 * Affiche dynamiquement les produits associés à une catégorie :
 * - Si `element.products` existe : usage backend
 * - Sinon : fallback sur les `MOCK_SERVICES`
 * - Trie les produits (promo d’abord, puis actifs, puis inactifs)
 * - Utilise `DataStatus` pour erreurs / chargement
 * - Affiche `ProductCard` pour chaque produit
 */
const CategoryProductList = ({ element, loading, error }) => {
  // 1. États de chargement / erreur
  if (loading) {
    return <DataStatus loading={true} error={null} dataLength={0} />;
  }
  if (error) {
    return <DataStatus loading={false} error={error} dataLength={0} />;
  }

  if (!element) return null;

  // 2. Source des produits
  const servicesIds = element.services ?? [];
  const fromBackend =
    Array.isArray(element.products) && element.products.length > 0;

  const rawProducts = fromBackend
    ? element.products
    : MOCK_SERVICES.filter((svc) => servicesIds.includes(svc.id));

  // 3. Aucune donnée
  if (!rawProducts.length) {
    return (
      <NoResult
        message="Aucun produit ou service associé à cette catégorie."
        image={placeHolder}
      />
    );
  }

  // 4. Tri intelligent
  const products = sortProductsByPriority(rawProducts);

  // 5. Rendu
  return (
    <section
      className="mt-10"
      role="region"
      aria-label="Liste des produits associés"
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Produits associés
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Produits listés"
      >
        {products.map((product) => {
          const isDisabled = !product.active;
          const linkTo = isDisabled ? null : `/products/${product.id}`;

          return (
            <ProductCard
              key={product.id}
              product={product}
              disabled={isDisabled}
              linkTo={linkTo}
              role="listitem"
            />
          );
        })}
      </div>
    </section>
  );
};

CategoryProductList.propTypes = {
  element: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.object),
    services: PropTypes.arrayOf(PropTypes.number),
  }),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CategoryProductList;
