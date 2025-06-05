import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryById } from "../../redux/slice/categorySlice"; // ou features/category/categorySlice
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
    // On appelle simplement le thunk : la logique de fallback est dans le thunk
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    // Si erreur persistante ET pas de catégorie, on redirige 404
    if (!loadingSelected && errorSelected && !selectedCategory) {
      navigate("/404");
    }
  }, [loadingSelected, errorSelected, selectedCategory, navigate]);

  if (loadingSelected || !selectedCategory) {
    return <p className="text-center mt-10">Chargement de la catégorie…</p>;
  }

  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      <button
        onClick={() => navigate("/categories")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ⬅️ Liste des catégories
      </button>

      <CategoryHeader element={selectedCategory}>
        <CategoryDescription element={selectedCategory} />
      </CategoryHeader>

      <CategoryProductList element={selectedCategory} />
    </div>
  );
};

export default CategoryDetails;
