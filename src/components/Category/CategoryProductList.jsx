import PropTypes from "prop-types";
import { sortProductsByPriority } from "../utils/sortProductByPriority";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ element }) => {
  const products = element.products || [];
  const sortedProducts = sortProductsByPriority(products);

  return (
    <main className="mt-6">
      <h2>Produits et Services</h2>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </section>
    </main>
  );
};

CategoryProductList.propTypes = {
  element: PropTypes.shape({
    products: PropTypes.array.isRequired,
  }).isRequired,
};

export default CategoryProductList;
