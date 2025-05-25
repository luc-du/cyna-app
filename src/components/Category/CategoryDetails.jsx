import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryDetails } from "../../redux/slice/categorySlice";
import NavigateButton from "../ui/buttons/NavigateButton";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const category = useSelector((state) =>
    state.categories.categories.find((cat) => cat.id === parseInt(categoryId))
  );

  useEffect(() => {
    if (!category) {
      dispatch(fetchCategoryDetails(categoryId));
    }
  }, [categoryId, category, dispatch]);

  if (!category) {
    return <p className="text-center mt-10">Chargement de la catégorie...</p>;
  }

  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      <NavigateButton
        handleClick={() => navigate("/categories")}
        label="⬅️Liste des catégories"
      />

      <CategoryHeader element={category}>
        <CategoryDescription element={category} />
      </CategoryHeader>

      <CategoryProductList element={category} />
    </div>
  );
};

export default CategoryDetails;
