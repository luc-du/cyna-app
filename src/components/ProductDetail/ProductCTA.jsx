import PropTypes from "prop-types";

import { FaCartPlus } from "react-icons/fa";
// 1.State :
// 2.Functions:
const addToCart = (item) => {
  console.log(`Article ${item.name} ajouté au panier `);
};
// 3. Others

// Render :
const ProductCTA = ({ product }) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        disabled={!product.available}
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition ${
          product.available
            ? "bg-primary hover:bg-CTAHover"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={() => addToCart(product)}
      >
        <FaCartPlus /> <span className="ml-2">Ajouter au panier</span>
      </button>
    </div>
  );
};

ProductCTA.propTypes = {
  product: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCTA;
