import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { placeHolder } from "../../assets/indexImages";

const CategoryCard = ({ category }) => {
  // Vérifie si category.images est un tableau et contient au moins une image
  //faire un utils de ce snippet pour l'utiliser dans d'autres composants❓
  const imageSrc =
    (Array.isArray(category.images) && category.images[0]?.url) || placeHolder;

  return (
    <Link
      to={`/categories/${category.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={imageSrc}
        alt={category.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
      </div>
    </Link>
  );
};
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
