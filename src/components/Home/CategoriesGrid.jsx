import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const mappedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    imageUrl: cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg",
    url: cat.id.toString(),
  }));

  return (
    <section className="w-full py-10 px-6 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>

      {loading && (
        <p className="text-center text-blue-500 mt-4">Chargement...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {mappedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
