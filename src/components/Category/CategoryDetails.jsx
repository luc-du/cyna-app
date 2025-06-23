import DataStatus from "@shared/DataStatus";
import NoResult from "@shared/NoResult";
import { fetchCategoryById } from "@slices/categorySlice";
import { emptyBox } from "@utils/indexImages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

/**
 * CategoryDetails
 * Affiche les détails d’une catégorie à partir de l’ID en URL.
 * Gère chargement, erreurs et affichage conditionnel de produits.
 *
 * @returns {JSX.Element}
 */
const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCategory, loadingSelected, errorSelected } = useSelector(
    (state) => state.categories
  );

  // Récupération de la catégorie au montage
  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch, categoryId]);

  // Redirige vers /404 si erreur persistante et aucune catégorie trouvée
  useEffect(() => {
    if (!loadingSelected && errorSelected && !selectedCategory) {
      navigate("/404");
    }
  }, [loadingSelected, errorSelected, selectedCategory, navigate]);

  // Affichage en cours de chargement
  if (loadingSelected) {
    return (
      <div
        className="w-full flex items-center justify-center py-16"
        role="status"
        aria-label="Chargement de la catégorie"
      >
        <Loader message="Chargement de la catégorie…" />
      </div>
    );
  }

  return (
    <main
      className="max-w-7xl w-full my-6 mx-auto p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      role="region"
      aria-labelledby="category-detail-title"
    >
      <h1 id="category-detail-title" className="sr-only">
        Détails de la catégorie {selectedCategory?.name || ""}
      </h1>

      <DataStatus
        loading={false}
        error={errorSelected}
        dataLength={selectedCategory ? 1 : 0}
        aria-label="Statut de la catégorie"
      />

      {selectedCategory && (
        <>
          <CategoryHeader element={selectedCategory}>
            <CategoryDescription element={selectedCategory} />
          </CategoryHeader>

          {Array.isArray(selectedCategory.products) &&
          selectedCategory.products.length > 0 ? (
            <CategoryProductList element={selectedCategory} />
          ) : (
            <NoResult
              message="Aucun produit dans cette catégorie."
              image={emptyBox}
            />
          )}
        </>
      )}
    </main>
  );
};

export default CategoryDetails;
