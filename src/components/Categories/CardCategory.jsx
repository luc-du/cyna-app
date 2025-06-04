// src/components/Pages/CardCategory.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * CardCategory
 *
 * - Affiche la vignette d'une catégorie, avec image + titre.
 */
const CardCategory = ({ element }) => {
  // Détermine l'URL : ici on suppose que “element.id” suffit
  const categoryLink = `/categories/${element.id}`;

  const imageSrc =
    (Array.isArray(element.images) && element.images[0]?.url) ||
    "/assets/images/placeholder-category.jpg";

  return (
    <Link
      to={categoryLink}
      className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      role="region"
      aria-label={`Catégorie : ${element.name}`}
      tabIndex={0}
    >
      <img
        src={imageSrc}
        alt={element.name}
        loading="lazy"
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.name}</h3>
        {element.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {element.description}
          </p>
        )}
      </div>
    </Link>
  );
};

CardCategory.propTypes = {
  element: PropTypes.shape({
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
