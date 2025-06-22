import PropTypes from "prop-types";

/**
 * Dropdown pour sélectionner le critère de tri.
 *
 * @param {string} sort - Valeur actuelle du tri (“priceAsc”, “priceDesc”, “newest”, “oldest”, “availableFirst”).
 * @param {(newSort: string) => void} onChange - Callback à chaque changement de sélection.
 */
export default function SortSelect({ sort, onChange }) {
  return (
    <div className="inline-flex items-center space-x-2">
      <label htmlFor="sort-select" className="text-gray-600">
        Trier par :
      </label>
      <select
        id="sort-select"
        value={sort}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="priceAsc">Prix : du moins cher au plus cher</option>
        <option value="priceDesc">Prix : du plus cher au moins cher</option>
      </select>
    </div>
  );
}

SortSelect.propTypes = {
  sort: PropTypes.oneOf(["priceAsc", "priceDesc", "availableFirst"]).isRequired,
  onChange: PropTypes.func.isRequired,
};
