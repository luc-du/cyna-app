import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../slice/cartSlice";

const Cart = () => {
  // 1.State
  const cart = useSelector((state) => state.cart.items);
  // 2.Functions
  const dispatch = useDispatch();
  // 3.Others

  // 4.Render
  return (
    <div id="cart">
      <h2>Mon panier</h2>
      {cart.length === 0 ? (
        <h3>Votre panier est vide!</h3>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>{item.price}€</p>
            <label>Quantité</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: parseInt(e.target.value),
                  })
                )
              }
              min="1"
            />
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
