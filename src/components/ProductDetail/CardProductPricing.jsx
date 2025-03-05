import PropTypes from "prop-types";
import { useState } from "react";
import AddToCartButton from "../ui/buttons/AddToCartButton";

const CardProductPricing = ({ option, product }) => {
  // 1. State
  const [toggle, setToggle] = useState(false);

  // 2. Functions
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  // 3. Others
  if (!option) {
    return <h2>Aucun service similaire à proposer</h2>;
  }

  // 4. Render
  return (
    <div className="flex flex-col border rounded-md p-4 shadow-md hover:shadow-lg transition cursor-pointer">
      <header>
        <h2 className="text-lg font-semibold text-primary">
          {option.name ?? "Nom indisponible"}
        </h2>
      </header>
      <div id="cardContent" className="flex flex-col flex-grow gap-4">
        <p className="text-gray-600">
          {toggle
            ? option.description
            : option.description.slice(0, 75) + "..."}
        </p>
        <p
          className="font-bold underline text-gray-600 text-right"
          onClick={handleToggle}
        >
          suite ...
        </p>
      </div>
      <div className="flex flex-grow items-center justify-end">
        <p className="text-xl font-bold my-2">
          {typeof option.price === "number"
            ? `${option.price}€`
            : `${option.price}`}
        </p>
      </div>
      <div className="flex items-center justify-center">
        {typeof option.price === "number" ? (
          <AddToCartButton product={product} pricing={option} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

CardProductPricing.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    available: PropTypes.bool,
  }).isRequired,
  product: PropTypes.object.isRequired,
};

export default CardProductPricing;
