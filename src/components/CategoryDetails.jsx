import { useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Détails de la Catégorie : {categoryId}
      </h1>
      <p>Informations sur la catégorie ici...</p>
    </div>
  );
};

export default CategoryDetails;
