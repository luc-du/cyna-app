import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import Loader from "../ui/Loader";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const dispatch = useDispatch();
  const {
    list: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  // Évite plusieurs dispatch au montage
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    if (!hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  // Détermine quelle data afficher
  let dataToDisplay = categories || [];

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
        <Loader
          message={
            <p
              className="text-center text-blue-500 mt-4"
              role="status"
              aria-live="polite"
            >
              Chargement...
            </p>
          }
        />
      )}

      {error && (
        <p className="text-center text-red-500 mt-4" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && dataToDisplay.length === 0 && (
        <p className="text-center text-gray-600 mt-4" role="status">
          Aucune catégorie disponible pour le moment.
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6"
        role="list"
        aria-label="Liste des catégories"
      >
        {dataToDisplay.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

CategoriesGrid.propTypes = {};

export default CategoriesGrid;
