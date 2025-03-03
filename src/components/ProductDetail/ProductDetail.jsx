import { Link, useParams } from "react-router-dom";
import { MOCK_TopProductsData } from "../../mock/MOCK_Top_Products";

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const productIdToNumber = parseInt(productId);

  const product = MOCK_TopProductsData.find(
    (product) => product.id === productIdToNumber
  );

  if (!product) {
    return <p>Produit non trouvé</p>;
  }

  return (
    <div className="max-w-4xl mt-12 mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Lien de retour */}
      <Link
        to={`/categories/${categoryId}/products`}
        className="text-blue-500 hover:underline text-sm mb-4 inline-block"
      >
        ⬅️ Retour à la liste des produits
      </Link>

      {/* Image principale */}
      <div className="flex justify-center mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Nom et informations du produit */}
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-gray-600 mt-2">Référence : {productId}</p>

      {/* price et disponibilité */}
      <div className="mt-4 flex items-center space-x-4">
        <span className="text-2xl font-semibold text-green-600">
          99.99€ {/* price statique pour l'instant */}
        </span>
        <span
          className={`text-sm font-bold ${
            product.available ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.available ? "available" : "Indisponible"}
        </span>
      </div>

      {/* Description détaillée */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bouton d'action */}
      <div className="mt-6">
        <button
          disabled={!product.available}
          className={`px-6 py-3 rounded-md text-white font-semibold transition 
            ${
              product.available
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

// Je pense avoir coller à la demande du cahier des charges
/* ⁉️ Créer une card */
