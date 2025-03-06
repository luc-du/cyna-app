import MOCK_TOP_PRODUCTS from "../../mock/MOCK_Top_Products";
import Grid from "./Grid";
import ProductCard from "./ProductCard";

const TopProductsGrid = () => {
  return (
    <section className="m-20">
      <Grid
        items={MOCK_TOP_PRODUCTS}
        renderItem={(product) => (
          <ProductCard key={product.id} product={product} />
        )}
        title="Les Top Produits du moment"
      />
    </section>
  );
};

export default TopProductsGrid;
