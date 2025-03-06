import { MOCK_Categories } from "../../mock/MOCKS_DATA";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  return (
    <section className="w-full py-10 px-6 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>
      {/* Passer en 3 cols contre 4 car pb de rendu => moche et que 3 catégories pour le moment */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {MOCK_Categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
