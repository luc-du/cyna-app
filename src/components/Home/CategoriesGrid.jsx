import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import { MOCK_Categories } from "../../mock/MOCKS_DATA";
import CategoryCard from "./CategoryCard";

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ROUTES.CATEGORIES.GET);

        const mappedCategories = response.data.map((cat) => ({
          id: cat.id,
          name: cat.name,
          imageUrl:
            cat.images?.[0]?.url || "/assets/images/placeholder-category.jpg", // fallback image
          url: cat.id.toString(), // route param
        }));

        setCategories(mappedCategories);
      } catch (error) {
        console.warn(
          "Échec de récupération des catégories, fallback mock :",
          error
        );
        setCategories(MOCK_Categories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-10 px-6 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primaryBackground">
        Nos Catégories
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Découvrez nos différentes solutions de cybersécurité adaptées à vos
        besoins.
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
