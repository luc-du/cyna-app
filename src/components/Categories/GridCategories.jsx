import PropTypes from "prop-types";
import CardCategory from "./CardCategory";

/**
 * GridCategories
 *
 * - Affiche une grille de catégories ou un message “vide”.
 * - Prend en prop un tableau “data” (soit toutes les catégories, soit les searchResults).
 */
const GridCategories = ({ data }) => {
  return (
    <div
      id="gridCategories"
      className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-7xl mx-auto"
      role="list"
      aria-label="Liste des catégories"
    >
      {Array.isArray(data) && data.length > 0 ? (
        data.map((category) => (
          <CardCategory category={category} key={category.id} />
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center p-10">
          <p className="text-xl text-gray-500">
            Oups, pas de catégories à afficher.
          </p>
        </div>
      )}
    </div>
  );
};

GridCategories.propTypes = {
  data: PropTypes.array.isRequired,
};

export default GridCategories;
