/* 
En attendant le backend, je set sur un localStorage
*/

import { createSlice } from "@reduxjs/toolkit";

// 1.Chargement du panier
const loadFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Erreur lors du chargement du panier:", error);
  }
};

// 2.SAuvegarde du panier
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du panier:", error);
  }
};

/* Calcul auto des prix */
const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return (
      acc + (item.price !== "Sur demande" ? item.price * item.quantity : 0)
    );
  }, 0);
};

/* RTK */

const initialState = {
  items: loadFromLocalStorage(),
  total: 0,
};

// slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* Ajouter un produit */
    addToCart: (state, action) => {
      // 1.Def du payload
      const { serviceId, categoryId, pricingId, name, price, duration } =
        action.payload;

      // 2.Find l'item
      const existingItem = state.items.find(
        (item) => item.serviceId === serviceId && item.pricing === pricingId
      );

      // 3.Fallback
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          serviceId,
          categoryId,
          pricingId,
          name,
          price,
          duration,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items);
    },

    /* Modif de la quantité */
    updateQuantity: (state, action) => {
      // 1.Def du payload :
      const { serviceId, pricingId, quantity } = action.payload;

      // 2.Find l'item
      const item = state.items.find(
        (item) => item.serviceId === serviceId && item.pricingId === pricingId
      );

      // 3.Si true
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }

      // 4.Mise à jour du total
      calculateTotal(state.items);
      // 5.Save
      saveCartToLocalStorage(state.items);
    },

    /* Suppr. un service */
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // 2.Mise à jour du total
      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items);
    },

    /* Vider le panier */
    clearCart: (state) => {
      state.items = [];

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
