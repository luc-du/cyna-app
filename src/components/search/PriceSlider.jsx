import PropTypes from "prop-types";

/**
 * Permet de choisir un prix minimum et maximum.
 * Ici, deux inputs de type number simulant un slider double.
 *
 * @param {string} label - Label général pour cette zone (ex. “Prix (min / max)”).
 * @param {number} min - Valeur minimale autorisée (ex. 0).
 * @param {number} max - Valeur maximale autorisée (ex. 2000).
 * @param {[number, number]} value - Tableau [valeurMinActuelle, valeurMaxActuelle].
 * @param {(ranges: {min: number, max: number}) => void} onChange - Callback à chaque changement.
 */
export default function PriceSlider({ label, min, max, value, onChange }) {
  const [currentMin, currentMax] = value;

  const handleMinChange = (e) => {
    const input = Number(e.target.value);

    if (isNaN(input)) return;

    onChange({
      min: input,
      max: currentMax,
    });
  };

  const handleMaxChange = (e) => {
    const input = Number(e.target.value);
    if (isNaN(input)) return;

    onChange({
      min: currentMin,
      max: input,
    });
  };

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          aria-label="Prix minimum"
          value={currentMin}
          onChange={handleMinChange}
          className="w-20 px-2 py-1 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary"
          min={min}
          max={max}
        />
        <span className="text-gray-600">–</span>
        <input
          type="number"
          aria-label="Prix maximum"
          value={currentMax}
          onChange={handleMaxChange}
          className="w-20 px-2 py-1 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary"
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}

PriceSlider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};
