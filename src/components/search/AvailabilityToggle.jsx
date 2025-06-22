import PropTypes from "prop-types";

/**
 * Un toggle (checkbox) pour filtrer sur la disponibilité.
 *
 * @param {string} label - Texte affiché à côté du toggle.
 * @param {boolean} checked - Si checked=true → on filtre pour "disponibles uniquement".
 * @param {(newChecked: boolean) => void} onChange - Callback à chaque changement.
 */
export default function AvailabilityToggle({ label, checked, onChange }) {
  return (
    <div className="mb-6">
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="form-checkbox h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
        />
        <span className="text-gray-700 dark:text-white">{label}</span>
      </label>
    </div>
  );
}

AvailabilityToggle.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
