import PropTypes from "prop-types";

const CardProductPricing = ({ option }) => {
  // 1.State :
  // 2.Functions:
  // 3. Others

  if (!option) {
    return null;
  }
  // 4.Render :
  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-primary">
        {option.name || "Nom indisponible"}
      </h3>
      <p className="text-gray-600">
        {option.description.slice(0, 75) + "..." || "Description non fournie"}
      </p>
      <p className="text-xl font-bold my-2">
        {option.prix ? `${option.prix}€` : "Prix non disponible"}
      </p>
      <div className="flex items-center justify-center ">
        <button
          disabled={!option.disponible}
          className={`w-full px-4 py-2 rounded-md text-white font-semibold transition ${
            option.disponible
              ? "bg-primary hover:bg-CTAHover"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {option.disponible ? "Acheter" : "Indisponible"}
        </button>
      </div>
    </div>
  );
};

CardProductPricing.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    prix: PropTypes.string,
    disponible: PropTypes.bool,
  }).isRequired,
};

export default CardProductPricing;
