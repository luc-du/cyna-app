import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ element }) => {
  // 1.State
  // 2.Function
  /* sorted by promo  */
  // 3.Others
  const products = element.products || [];
  // 4.Render
  return (
    <main className="mt-6">
      <h2>Produits et Services</h2>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          return <ProductCard item={item} key={item.id} />;
        })}
      </section>
    </main>
  );
};

CategoryProductList.propTypes = {
  element: PropTypes.object.isRequired,
};

export default CategoryProductList;
