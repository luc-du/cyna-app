import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getImageSrc } from "../utils/getImageSrc";

/**
 * CardCategory
 *
 * - Affiche la vignette d'une catégorie, avec image + titre.
 */
const CardCategory = ({ category }) => {
  // Détermine l'URL : ici on suppose que “element.id” suffit
  const categoryLink = `/categories/${category.id}`;

  // Récupère l'URL de l'image, ou une image par défaut si pas d'images
  const imageSrc = getImageSrc(category);

  return (
    <Link
      to={categoryLink}
      className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      role="region"
      aria-label={`Catégorie : ${category.name}`}
      tabIndex={0}
    >
      <img
        src={imageSrc}
        alt={category.name}
        loading="lazy"
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
        {category.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
};

CardCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    description: PropTypes.string,
  }).isRequired,
};

export default CardCategory;
