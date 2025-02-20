import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Détails du Produit</h1>
      <p>Catégorie : {categoryId}</p>
      <p>Produit : {productId}</p>
      <p>Informations sur le produit ici...</p>
    </div>
  );
};

export default ProductDetails;
