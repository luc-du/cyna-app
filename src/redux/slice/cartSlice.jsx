import { createSlice } from "@reduxjs/toolkit";

// 1️.Chargement du panier - Fix du total depuis localStorage
const loadFromLocalStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = JSON.parse(localStorage.getItem("total")) || 0;
    return { cart, total };
  } catch (error) {
    console.error("Erreur lors du chargement du panier:", error);
    return { cart: [], total: 0 };
  }
};

// 2️.Sauvegarde dans localStorage
const saveCartToLocalStorage = (cart, total) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du panier:", error);
  }
};

// 3️.Calcul du total du panier
const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return (
      acc + (item.price !== "Sur demande" ? item.price * item.quantity : 0)
    );
  }, 0);
};

// 4️.Init. du state avec les valeurs de localStorage
const { cart, total } = loadFromLocalStorage();
const initialState = {
  items: cart,
  total: total,
};

// 5️.Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* 5.1.Ajouter un service avec une option de pricing */
    addToCart: (state, action) => {
      const { serviceId, pricingId, name, imageUrl, price, duration } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item.serviceId === serviceId && item.pricingId === pricingId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          serviceId,
          pricingId,
          name,
          imageUrl,
          price,
          duration,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    /* 5.2.Modifier la quantité */
    updateQuantity: (state, action) => {
      const { serviceId, pricingId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.serviceId === serviceId && item.pricingId === pricingId
      );

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    /* 5.3.Supprimer un élément */
    removeFromCart: (state, action) => {
      const { serviceId, pricingId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.serviceId === serviceId && item.pricingId === pricingId)
      );

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    /* 5.4.Vider le panier */
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToLocalStorage(state.items, state.total);
      console.log("clearCart");
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
