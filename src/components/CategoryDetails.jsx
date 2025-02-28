import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useFindById from "../hooks/useFindById";
import { MOCK_Categories } from "../mock/MOCK_Categories";
import CTAButton from "./ui/buttons/CTAButton";
import NavigateButton from "./ui/buttons/NavigateButton";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const findCategory = useFindById(categoryId, MOCK_Categories);

  if (!findCategory) {
    navigate("/");
  }

  return (
    <div className="max-w-6xl m-auto p-4">
      <NavigateButton
        handleClick={() => navigate(-1)}
        label="Liste des produits"
      />
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
                  <CTAButton
                    link={`/products/${item.id}`}
                    label="Voir le produit"
                  />
                </div>
              </div>
            );
          })}
          <h1>Test tailwind</h1>
        </section>
      </main>
    </div>
  );
};

export default CategoryDetails;
