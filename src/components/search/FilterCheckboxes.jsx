import PropTypes from "prop-types";

/**
 * Composant FilterCheckboxes
 * Affiche une liste de cases à cocher pour filtrer des résultats par facettes (catégories, options techniques, etc.)
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - Titre du groupe de filtres.
 * @param {Array<{id: string|number, name: string}>} props.options - Options disponibles à cocher.
 * @param {Array<string|number>} props.selected - Liste des valeurs cochées.
 * @param {(newSelected: Array<string|number>) => void} props.onChange - Callback quand une option change.
 */
export default function FilterCheckboxes({
  title,
  options,
  selected,
  onChange,
}) {
  /**
   * Gère l'inversion de l'état coché pour une option donnée.
   * @param {string|number} optionId
   */
  const handleToggle = (optionId) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter((id) => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  return (
    <fieldset className="mb-6">
      <legend className="font-medium mb-2 text-gray-800 dark:text-white">
        {title}
      </legend>
      <div className="flex flex-col space-y-1">
        {options.map((opt) => (
          <label
            key={opt.id}
            className="inline-flex items-center space-x-2 cursor-pointer"
            aria-checked={selected.includes(opt.id)}
          >
            <input
              type="checkbox"
              value={opt.id}
              checked={selected.includes(opt.id)}
              onChange={() => handleToggle(opt.id)}
              className="form-checkbox h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
              aria-labelledby={`checkbox-${opt.id}`}
            />
            <span
              id={`checkbox-${opt.id}`}
              className="text-gray-700 dark:text-gray-300 text-sm"
            >
              {opt.name}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
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
