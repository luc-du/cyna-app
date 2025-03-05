import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { MOCK_PricingOptions } from "../../mock/MOCKS_DATA";
import { addToCart } from "../../redux/slice/cartSlice";

const ProductCTA = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  // 1.Récup. du pricing par défaut
  const defaultPricing = MOCK_PricingOptions.find(
    (p) => p.id === product.defaultPricing
  );

  if (!defaultPricing) {
    console.error(`Aucune option tarifaire par défaut pour ${product.name}`);
    return null;
  }

  // 2️.Fonction d'ajout au panier
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        serviceId: product.id,
        categoryId: product.categoryId,
        pricingId: defaultPricing.id,
        name: product.name,
        price: defaultPricing.price,
        duration: defaultPricing.name,
      })
    );
    console.log(`Ajouté : ${product.name} (${defaultPricing.name}) au panier`);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        disabled={!product.available}
        className={`flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition ${
          product.available
            ? "bg-primary hover:bg-CTAHover"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
      >
        <FaCartPlus /> <span className="ml-2">Ajouter au panier</span>
      </button>
    </div>
  );
};

// 3️.Vérif. des props
ProductCTA.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    defaultPricing: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCTA;
