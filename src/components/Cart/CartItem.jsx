import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";
import { formatStripePrice } from "../utils/formatStripePrice";
import { getPricingLabel } from "../utils/pricingLabel";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white shadow-md p-4 rounded-lg">
      {/* Image + Détails produit */}
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="text-left font-semibold sm:text-base text-sm">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500">{getPricingLabel(item.pricingModel)}</p>
          <p className="text-gray-700">
            Prix unitaire : {formatStripePrice(item.price)}
          </p>
        </div>
      </div>

      {/* Quantité */}
      <div className="flex items-center space-x-2 col-span-1 justify-end sm:justify-center">
        <button
          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-lg"
          onClick={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                pricingModel: item.pricingModel,
                quantity: item.quantity - 1,
              })
            )
          }
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-2 border rounded-lg">{item.quantity}</span>
        <button
          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-lg"
          onClick={() =>
            dispatch(
              updateQuantity({
                id: item.id,
                pricingModel: item.pricingModel,
                quantity: item.quantity + 1,
              })
            )
          }
        >
          +
        </button>
      </div>

      {/* Supprimer */}
      <div className="col-span-1 flex justify-center">
        <button
          className="text-red-600 underline text-sm sm:text-base"
          onClick={() =>
            dispatch(
              removeFromCart({
                id: item.id,
                pricingModel: item.pricingModel,
              })
            )
          }
        >
          Supprimer
        </button>
      </div>

      {/* Total ligne */}
      <div className="text-right font-semibold sm:text-base text-sm">
        <span>{formatStripePrice(item.price * item.quantity)}</span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pricingModel: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
