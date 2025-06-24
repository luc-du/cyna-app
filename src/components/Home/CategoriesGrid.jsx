import DataStatus from "@shared/DataStatus";
import { fetchCategories } from "@slices/categorySlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <section
      className="w-full py-10 px-6 md:px-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      aria-labelledby="categories-heading"
      role="region"
    >
      <h2
        id="categories-heading"
        className="text-2xl md:text-3xl font-bold text-center text-primaryBackground dark:text-white"
        tabIndex={0}
      >
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>
      <DataStatus
        loading={loading}
        error={error}
        dataLength={categories.length}
      />
      <div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        role="list"
        aria-label="Liste des catégories"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
