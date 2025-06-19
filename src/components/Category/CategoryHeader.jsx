import PropTypes from "prop-types";
import { getImageSrc } from "../utils/getImageSrc";

/**
 * CategoryHeader
 * Affiche une bannière visuelle avec le nom de la catégorie et une image associée.
 * Utilisé comme header de la page catégorie.
 *
 * @param {object} element - Objet catégorie avec image, nom, description
 * @param {ReactNode} children - Contenu additionnel (description ou composant)
 */
const CategoryHeader = ({ element, children }) => {
  const imageUrl = getImageSrc(element);

  return (
    <section
      className="text-center my-6"
      role="banner"
      aria-label={`En-tête visuel de la catégorie ${element.name}`}
    >
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <img
          src={imageUrl}
          alt={`Illustration de ${element.name}`}
          className="w-full max-h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white transition-transform transform hover:scale-105 hover:shadow-2xl">
            {element.name}
          </h1>
        </div>
      </div>

      {children}
    </section>
  );
};

CategoryHeader.propTypes = {
  element: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({ url: PropTypes.string.isRequired })
    ).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

export default CategoryHeader;
