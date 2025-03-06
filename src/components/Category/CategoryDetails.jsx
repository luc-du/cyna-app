import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useFindById from "../../hooks/useFindById";
import { MOCK_Categories } from "../../mock/MOCKS_DATA";
import NavigateButton from "../ui/buttons/NavigateButton";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const findCategory = useFindById(categoryId, MOCK_Categories);

  if (!findCategory) {
    navigate("/");
  }

  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      {/* Bouton de navigation*/}
      <NavigateButton
        handleClick={() => navigate("/categories")}
        label="Liste des produits"
      />

      {/* Header affichage -  de l'image catégorie */}

      <CategoryHeader element={findCategory}>
        {/* Description de la catégorie */}
        <CategoryDescription element={findCategory} />
      </CategoryHeader>

      {/* Rendu de la liste de liste des produits et services */}
      <CategoryProductList element={findCategory} />
    </div>
  );
};

export default CategoryDetails;
