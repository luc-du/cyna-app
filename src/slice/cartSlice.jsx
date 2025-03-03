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
      const { id, name, price, duration } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price, duration, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },

    /* Modif de la quantité */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }
      saveCartToLocalStorage(state.items);
    },

    /* Suppr. un produit */
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },

    /* Vider le panier */
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
