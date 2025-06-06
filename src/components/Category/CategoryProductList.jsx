import PropTypes from "prop-types";
import { placeHolder } from "../../assets/indexImages";
import { MOCK_SERVICES } from "../../mock/MOCKS_DATA";
import ProductCard from "../Home/ProductCard";
import DataStatus from "../shared/DataStatus";
import NoResult from "../shared/NoResult";
import sortProductsByPriority from "../utils/sortProductByPriority";

/**
 * Affiche les produits d'une catégorie, en mode hybride (backend ou mock)
 * - trie par promo/active
 * - délègue l’affichage/style de chaque carte à ProductCard
 * - utilise DataStatus + NoResult pour gérer les états
 */
const CategoryProductList = ({ element, loading, error }) => {
  // 1. Loading ou erreur → DataStatus
  if (loading) {
    return <DataStatus loading={true} error={null} dataLength={0} />;
  }
  if (error) {
    return <DataStatus loading={false} error={error} dataLength={0} />;
  }

  if (!element) return null;

  // 2. Récupère la source des produits (backend ou mock)
  const servicesIds = element.services ?? [];
  const fromBackend =
    Array.isArray(element.products) && element.products.length > 0;
  const rawProducts = fromBackend
    ? element.products
    : MOCK_SERVICES.filter((svc) => servicesIds.includes(svc.id));

  // 3. Si aucun produit à afficher
  if (!rawProducts.length) {
    return (
      <NoResult
        message="Aucun produit ou service associé à cette catégorie."
        image={placeHolder}
      />
    );
  }

  // 4. Tri selon promo && active
  const products = sortProductsByPriority(rawProducts);

  // 5. Rendu de la grille
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Produits associés
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const isDisabled = !product.active;
          const linkTo = isDisabled ? null : `/products/${product.id}`;

          return (
            <ProductCard
              key={product.id}
              product={product}
              disabled={isDisabled}
              linkTo={linkTo}
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
  error: PropTypes.string,
};

CategoryProductList.defaultProps = {
  loading: false,
  error: null,
};

export default CategoryProductList;
