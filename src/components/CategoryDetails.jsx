import { useParams } from "react-router-dom";
import { MOCK_Categories } from "../mock/MOCK_Categories";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const categoryIdToNumber = parseInt(categoryId);

  const findCategory = MOCK_Categories.find((category) => {
    return category.id === categoryIdToNumber;
  });

  if (!findCategory) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{findCategory.name}</h1>
      <p>{findCategory.description}</p>
    </div>
  );
};

export default CategoryDetails;
