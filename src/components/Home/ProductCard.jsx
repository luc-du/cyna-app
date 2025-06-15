import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getImageSrc } from "../utils/getImageSrc";
import { getPromo } from "../utils/getMockData";

const ProductCard = ({ product, disabled = false, linkTo = "" }) => {
  if (!product || !product.id || !product.name) {
    console.warn("ProductCard – product mal formé :", product);
    return null;
  }

  const imageSrc = getImageSrc(product);
  const promotion = product.promo ? getPromo(product.id) : null;
  const isActive = Boolean(product.active) && !disabled;

  const containerClass = [
    "bg-white dark:bg-gray-700 dark:border dark:border-gray-600",
    "shadow-md rounded-lg overflow-hidden flex flex-col transition-colors duration-300",
    isActive ? "hover:shadow-xl" : "opacity-50 cursor-not-allowed",
  ].join(" ");

  const content = (
    <>
      <div className="w-full">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover flex-shrink-0"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between gap-2 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {product.name}
          </h3>
          {promotion && (
            <h4 className="mb-4 text-center text-green-500 font-medium">
              {promotion}
            </h4>
          )}
          <p className="text-gray-600 dark:text-gray-300">
            {typeof product.amount === "number" && product.amount > 0
              ? `${product.amount.toFixed(2)} €`
              : "Prix sur demande"}
          </p>
        </div>
        {product.brand && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Marque : {product.brand}
          </p>
        )}
      </div>
    </>
  );

  if (!isActive || !linkTo) {
    return <div className={containerClass}>{content}</div>;
  }

  return (
    <Link
      to={linkTo}
      className={containerClass}
      aria-label={`Voir les détails de ${product.name}`}
    >
      {content}
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    promo: PropTypes.bool,
    active: PropTypes.bool,
    brand: PropTypes.string,
    images: PropTypes.array,
    amount: PropTypes.number,
  }).isRequired,
  disabled: PropTypes.bool,
  linkTo: PropTypes.string,
};

export default ProductCard;
