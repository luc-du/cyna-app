import MOCK_CATEGORIES from "../../mock/MOCK_Categories";
import CategoryCard from "./CategoryCard";
import Grid from "./Grid";

const CategoriesGrid = () => {
  return (
    <section className="m-20 bg-gray-100">
      <Grid
        items={MOCK_CATEGORIES}
        renderItem={(category) => (
          <CategoryCard key={category.id} category={category} />
        )}
        title="Nos Catégories"
      />
    </section>
  );
};

export default CategoriesGrid;
