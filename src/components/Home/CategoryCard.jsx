import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getImageSrc } from "../utils/getImageSrc";

const CategoryCard = ({ category }) => {
  const imageSrc = getImageSrc(category);

  return (
    <Link
      to={`/categories/${category.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md dark:shadow-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={imageSrc}
        alt={category.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
