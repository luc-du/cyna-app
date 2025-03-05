import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slice/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-4 items-center bg-white shadow-md p-4 rounded-lg">
      {/* ✅ Image + Nom du produit */}
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500">{item.duration}</p>
          {item.price !== "Sur demande" ? (
            <p className="text-gray-700">Prix : {item.price}€</p>
          ) : (
            <p className="text-red-500 font-semibold">Sur demande</p>
          )}
        </div>
      </div>

      {/* ✅ Sélection de quantité */}
      <div className="flex items-center space-x-2 col-span-1 justify-center">
        <button
          className="bg-primary text-white px-3 py-2 rounded-lg"
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
          className="bg-primary text-white px-3 py-2 rounded-lg"
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

      {/* ✅ Supprimer le produit */}
      <div className="col-span-1 flex justify-center">
        <button
          className="text-red-600 underline"
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

      {/* ✅ Affichage du total par produit */}
      <div className="col-span-1 text-right font-semibold">
        <span>
          {item.price !== "Sur demande"
            ? `${(item.price * item.quantity).toFixed(2)}€`
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
