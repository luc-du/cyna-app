import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";
import { formatStripePrice } from "../utils/formatStripePrice";
import { getPricingLabel } from "../utils/pricingLabel";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grids-cols-1  gap-4 sm:grid-cols-4 items-center bg-white shadow-md p-4 rounded-lg">
      {/* Image + Nom du produit */}
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="text-right font-semibold sm:text-base text-sm mt-2 sm:mt-0">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500">{getPricingLabel(item.duration)}</p>
          {item.price !== "Sur demande" ? (
            <p className="text-gray-700">
              Prix : {formatStripePrice(item.price)}
            </p>
          ) : (
            <p className="text-red-500 font-semibold">Sur demande</p>
          )}
        </div>
      </div>

      {/* Sélection de quantité */}
      <div
        id="cta-section"
        className="flex items-center space-x-2 col-span-1 justify-end sm:justify-center"
      >
        <button
          className="w-8 h-8 flex items-center justify-center bg-primary text-white px-3 py-2 rounded-lg text-lg"
          onClick={() =>
            dispatch(
              updateQuantity({
                serviceId: item.serviceId,
                pricingId: item.pricingId,
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
          className="w-8 h-8 flex items-center justify-center bg-primary text-white px-3 py-2 rounded-lg text-lg"
          onClick={() =>
            dispatch(
              updateQuantity({
                serviceId: item.serviceId,
                pricingId: item.pricingId,
                quantity: item.quantity + 1,
              })
            )
          }
        >
          +
        </button>
      </div>

      {/* Supprimer le produit */}
      <div className="col-span-1 flex justify-center">
        <button
          className="text-red-600 underline text-sm sm:text-base"
          onClick={() =>
            dispatch(
              removeFromCart({
                serviceId: item.serviceId,
                pricingId: item.pricingId,
              })
            )
          }
        >
          Supprimer
        </button>
      </div>

      {/* Affichage du total par produit */}
      <div className="text-right font-semibold sm:text-base text-sm mt-2 sm:mt-0">
        <span>
          {item.price !== "Sur demande"
            ? `${formatStripePrice(item.price * item.quantity)}`
            : "Sur demande"}
        </span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    pricingId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
