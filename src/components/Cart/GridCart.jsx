import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";
import TotalPerProduct from "./TotalPerProduct";

const GridCart = ({ cart, updateQuantity, removeFromCart }) => {
  // 1.State
  const dispatch = useDispatch();
  // 1.State
  // 2.Function
  // 3.Others

  // 4.Render
  return (
    <div className="grid grid-cols-1 gap-6">
      {cart.map((item) => (
        <div
          key={`${item.serviceId}-${item.pricingId}`}
          className="grid grid-cols-4 items-center bg-white shadow-md p-4 rounded-lg"
        >
          {/* Image + Nom du produit */}
          <div className="flex items-center space-x-4 col-span-1">
            <div className="w-16 h-16 flex items-center content-center bg-gray-200 rounded-lg">
              <img
                src={item.imageUrl}
                alt={`Image du service ${item.name}`}
                className="w-16 h-16 object-cover object-center rounded-lg"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-500">{item.duration}</p>
              {item.quantity > 0 ? (
                <p className="text-gray-700">Prix : {item.price}€</p>
              ) : (
                <p className="text-red-500 font-semibold">
                  Produit indisponible
                </p>
              )}
            </div>
          </div>

          {/* Sélection de quantité */}
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

          {/* Actions */}
          <div className="col-span-1 flex justify-center">
            {item.quantity === 0 ? (
              <button className="text-primary underline">
                Remplacer le produit
              </button>
            ) : (
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
            )}
          </div>

          {/* Affichage total par produit */}
          <TotalPerProduct item={item} />
        </div>
      ))}

      {/* Vider le panier */}
      <div className="mt-6 flex justify-center">
        {cart.length && (
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition"
            onClick={() => dispatch(clearCart())}
          >
            Vider le panier
          </button>
        )}
      </div>
    </div>
  );
};
GridCart.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default GridCart;
