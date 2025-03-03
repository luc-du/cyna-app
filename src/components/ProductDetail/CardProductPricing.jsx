import PropTypes from "prop-types";
import { useState } from "react";
import AddToCartButton from "../ui/buttons/AddToCartButton";

const CardProductPricing = ({ option }) => {
  // 1. State
  const [toggle, setToggle] = useState(false);

  // 2. Functions
  const handleToggle = () => {
    setToggle((prev) => !prev);
    console.log(!toggle);
  };

  // 3. Others
  if (!option) {
    return null;
  }

  // 4. Render
  return (
    <div
      onClick={handleToggle}
      className="border rounded-md p-4 shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-primary">
        {option.name ?? "Nom indisponible"}
      </h3>
      <p className="text-gray-600">
        {toggle ? option.description : option.description.slice(0, 75) + "..."}
      </p>
      <div className="flex items-center justify-end">
        <p className="text-xl font-bold my-2">
          {option.prix ? `${option.prix}€` : "Prix non disponible"}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <AddToCartButton product={option} />
      </div>
    </div>
  );
};

CardProductPricing.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    prix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disponible: PropTypes.bool,
  }).isRequired,
};

export default CardProductPricing;
