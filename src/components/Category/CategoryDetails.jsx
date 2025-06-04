import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../ui/buttons/NavigateButton";
import CategoryDescription from "./CategoryDescription";
import CategoryHeader from "./CategoryHeader";
import CategoryProductList from "./CategoryProductList";

/**
 * Affiche les détails d'une catégorie à partir de son ID.
 * Redirige vers la liste des catégories en cas d'erreur ou ID invalide.
 */
const CategoryDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  // Conversion en nombre pour matcher l'ID de la catégorie dans le store
  const parsedId = parseInt(categoryId);

  // Si l'ID n'est pas un entier valide, redirection immédiate
  useEffect(() => {
    if (isNaN(parsedId)) {
      navigate("/categories", { replace: true });
    }
  }, [parsedId, navigate]);

  // Récupération de la liste des catégories en store
  const categoryList = useSelector((state) => state.categories.list);

  // Recherche de la catégorie dans le state global
  const category = categoryList.find((cat) => cat.id === parsedId);

  // Redirection fallback si non trouvée
  useEffect(() => {
    if (!category) {
      console.warn(`Aucune catégorie trouvée pour l'ID ${categoryId}`);
      navigate("*", { replace: true });
    }
  }, [category, categoryId, navigate]);

  if (!category) {
    return (
      <p className="text-center mt-10 text-gray-600" role="status">
        Chargement ou redirection...
      </p>
    );
  }

  return (
    <div className="max-w-7xl w-full my-6 mx-auto p-4">
      <NavigateButton
        handleClick={() => navigate("/categories")}
        label="⬅️ Retour aux catégories"
      />
      <CategoryHeader element={category}>
        <CategoryDescription element={category} />
      </CategoryHeader>
      <CategoryProductList element={category} />
    </div>
  );
};

export default CategoryDetails;
