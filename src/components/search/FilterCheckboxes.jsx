import PropTypes from "prop-types";

/**
 * Affiche une liste de checkboxes pour sélectionner plusieurs options.
 *
 * @param {string} title - Titre de la section des filtres (e.g. “Catégories”).
 * @param {Array<{id: string|number, name: string}>} options - Liste d’options disponibles.
 * @param {Array<string|number>} selected - Tableau des IDs actuellement cochés.
 * @param {(newSelected: Array<string|number>) => void} onChange - Fonction à appeler quand un checkbox change.
 */
export default function FilterCheckboxes({
  title,
  options,
  selected,
  onChange,
}) {
  const handleToggle = (optionId) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter((id) => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex flex-col space-y-1">
        {options.map((opt) => (
          <label key={opt.id} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              value={opt.id}
              checked={selected.includes(opt.id)}
              onChange={() => handleToggle(opt.id)}
              className="form-checkbox h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-gray-700">{opt.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

FilterCheckboxes.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
