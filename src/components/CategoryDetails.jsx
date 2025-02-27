import { Link, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { MOCK_Categories } from "../mock/MOCK_Categories";

const CategoryDetails = () => {
  const navigate = useNavigate();
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
    <div id="category_container" className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
      >
        Liste des produits
      </button>

      <div className="text-center my-6">
        <div className="relative">
          <img
            src={findCategory.imageUrl}
            alt={findCategory.name}
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white transition transform hover:scale-105 hover:shadow-2xl">
              {findCategory.name}
            </h1>
          </div>{" "}
        </div>
        <h2 className="text-xl font-semibold text-gray-600 mt-2">
          Description du service
        </h2>
        <p className="mt-2 text-gray-700">{findCategory.description}</p>
      </div>

      <main className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Produits du service</h2>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {findCategory.products.map((item) => {
            return (
              <div
                id="card_product"
                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition transform hover:scale-105"
                key={item.id}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-blue-600 font-bold">{item.prix} €</span>
                  <span
                    className={`block text-sm font-semibold mt-2 ${
                      item.disponible ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.disponible ? "Disponible" : "Indisponible"}
                  </span>
                  <button
                    type="button"
                    className="mt-4 w-full px-4 py-2 rounded-md text-white font-semibold transition bg-blue-500 hover:bg-blue-600"
                  >
                    <Link to={`/products/${item.id}`}>Voir le produit</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default CategoryDetails;
