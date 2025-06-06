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

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCategory, loadingSelected, errorSelected } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch, categoryId]);

  // Si l’API renvoie une erreur ET qu’on n’a pas de catégorie, on redirige
  useEffect(() => {
    if (!loadingSelected && errorSelected && !selectedCategory) {
      navigate("/404");
    }
  }, [loadingSelected, errorSelected, selectedCategory, navigate]);

  // Tant que l’on charge, on affiche DataStatus (qui inclut le loader)
  if (loadingSelected) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <Loader message="Chargement de la catégorie…" />
      </div>
    );
  }
  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      <button
        onClick={() => navigate("/categories")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ⬅️ Liste des catégories
      </button>

      {/* DataStatus gère l’erreur persistante */}
      <DataStatus
        loading={false}
        error={errorSelected}
        dataLength={selectedCategory ? 1 : 0}
        emptyMessage=""
        aria-label="Statut de la catégorie"
      />

      {selectedCategory && (
        <>
          <CategoryHeader element={selectedCategory}>
            <CategoryDescription element={selectedCategory} />
          </CategoryHeader>

          {/* Si la catégorie existe mais qu’elle n’a aucun produit, on affiche NoResult */}
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
    </div>
  );
};

export default CategoryDetails;
