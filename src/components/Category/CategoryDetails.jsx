import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_CATEGORIES } from "../../mock/MOCKS_DATA";
import { fetchCategoryById } from "../../redux/slice/categorySlice";
import NavigateButton from "../ui/buttons/NavigateButton";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasTriedLocalFallback = useRef(false);

  const {
    selectedCategory,
    loadingSelected,
    errorSelected,
    list: fullList,
  } = useSelector((state) => state.categories);

  // Si aucune catégorie sélectionnée, on tente de la récupérer (BE ou mock)
  useEffect(() => {
    if (!selectedCategory || selectedCategory.id?.toString() !== categoryId) {
      const fallback = [...fullList, ...MOCK_CATEGORIES].find(
        (cat) => cat.id?.toString() === categoryId
      );

      if (fallback) {
        dispatch({
          type: "categories/fetchById/fulfilled",
          payload: fallback,
        });
        hasTriedLocalFallback.current = true;
      } else {
        dispatch(fetchCategoryById(categoryId));
        hasTriedLocalFallback.current = false;
      }
    }
  }, [categoryId, dispatch, selectedCategory, fullList]);

  // Redirection 404 en cas d’échec
  useEffect(() => {
    if (!loadingSelected && errorSelected && !selectedCategory) {
      navigate("/404");
    }
  }, [loadingSelected, errorSelected, selectedCategory, navigate]);

  if (loadingSelected || !selectedCategory) {
    return <p className="text-center mt-10">Chargement de la catégorie…</p>;
  }

  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      <NavigateButton
        handleClick={() => navigate("/categories")}
        label="⬅️ Liste des catégories"
      />

      <CategoryHeader element={selectedCategory}>
        <CategoryDescription element={selectedCategory} />
      </CategoryHeader>

      {/* <CategoryProductList element={selectedCategory} /> */}
    </div>
  );
};

export default CategoryDetails;
