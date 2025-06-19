import PropTypes from "prop-types";

/**
 * CategoryDescription
 * Affiche le texte de description de la catégorie ou service associé.
 * Doit être intégré sous CategoryHeader.
 *
 * @param {object} element - Objet contenant la propriété `description`
 */
const CategoryDescription = ({ element }) => {
  return (
    <section
      className="mt-6 px-4 max-w-3xl mx-auto"
      aria-labelledby="category-description-title"
    >
      <h2
        id="category-description-title"
        className="text-xl font-semibold text-gray-800 dark:text-white text-center"
      >
        Description du service
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300 text-base leading-relaxed text-center">
        {element.description}
      </p>
    </section>
  );
};

CategoryDescription.propTypes = {
  element: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryDescription;
