import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOCK_CATEGORIES } from "../../mock/MOCKS_DATA"; // Assure-toi d'avoir ce mock disponible
import { fetchCategories } from "../../redux/slice/categorySlice";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  // Gestion du fallback avec avertissement console
  const safeCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : (() => {
          console.warn(
            "Fallback utilisé : affichage des catégories mockées sur HomePage (CategoriesGrid)"
          );
          return MOCK_CATEGORIES;
        })();

  const mappedCategories = safeCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    imageUrl:
      Array.isArray(cat.images) && cat.images.length > 0
        ? cat.images[0].url
        : "/assets/images/placeholder-category.jpg",
    url: cat.id.toString(),
  }));

  return (
    <section
      className="w-full py-10 px-6 md:px-20"
      aria-labelledby="categories-heading"
      role="region"
    >
      <h2
        id="categories-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground"
      >
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>

      {/* Indicateur de chargement */}
      {loading && (
        <p
          className="text-center text-blue-500 mt-4"
          role="status"
          aria-live="polite"
        >
          Chargement...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-4" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && mappedCategories.length === 0 && (
        <p className="text-center text-gray-600 mt-4" role="status">
          Aucune catégorie disponible pour le moment.
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6"
        role="list"
        aria-label="Liste des catégories"
      >
        {mappedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

CategoriesGrid.propTypes = {};

export default CategoriesGrid;
