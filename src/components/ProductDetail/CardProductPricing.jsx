import PropTypes from "prop-types";

const CardProductPricing = ({ option }) => {
  // 1.State :
  // 2.Functions:
  // 3. Others

  if (!option) {
    return null;
  }

  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-primary">
        {option.name || "Nom indisponible"}
      </h3>
      <p className="text-gray-600">
        {option.description || "Description non fournie"}
      </p>
      <p className="text-xl font-bold my-2">
        {option.price ? `${option.price}` : "Prix non disponible"}
      </p>
      <button
        disabled={!option.available}
        className={`w-full px-4 py-2 rounded-md text-white font-semibold transition ${
          option.available
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {option.available ? "Acheter" : "Indisponible"}
      </button>
    </div>
  );
};

CardProductPricing.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.bool,
  }).isRequired,
};

export default CardProductPricing;
