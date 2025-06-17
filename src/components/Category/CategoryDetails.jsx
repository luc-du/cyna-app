import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { emptyBox } from "../../assets/indexImages";
import { fetchCategoryById } from "../../redux/slice/categorySlice";
import DataStatus from "../shared/DataStatus";
import NoResult from "../shared/NoResult";
import Loader from "../ui/Loader";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

/**
 * Page de détails d'une catégorie.
 * Récupère dynamiquement les données via l'ID depuis l'URL.
 * Gère les erreurs, l'état de chargement, et l'affichage fallback.
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

  // Si l’API renvoie une erreur persistante sans catégorie : redirection vers 404
  useEffect(() => {
    if (!loadingSelected && errorSelected && !selectedCategory) {
      navigate("/404");
    }
  }, [loadingSelected, errorSelected, selectedCategory, navigate]);

  // Pendant le chargement : affichage centré du loader
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
      aria-label={`Détails de la catégorie ${selectedCategory?.name || ""}`}
    >
      <button
        onClick={() => navigate("/categories")}
        className="mb-4 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ⬅ Retour à la liste des catégories
      </button>

      {/* Affichage d'une erreur générique si besoin */}
      <DataStatus
        loading={false}
        error={errorSelected}
        dataLength={selectedCategory ? 1 : 0}
        aria-label="Statut de la catégorie"
      />

      {/* Si la catégorie est chargée avec succès */}
      {selectedCategory && (
        <>
          <CategoryHeader element={selectedCategory}>
            <CategoryDescription element={selectedCategory} />
          </CategoryHeader>

          {/* Affichage conditionnel des produits */}
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
