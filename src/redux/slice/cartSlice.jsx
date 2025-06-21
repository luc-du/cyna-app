import { createSlice } from "@reduxjs/toolkit";

// 1. LocalStorage - chargement
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

// 2. LocalStorage - sauvegarde
const saveCartToLocalStorage = (cart, total) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du panier:", error);
  }
};

// 3. Total dynamique
const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return (
      acc + (typeof item.price === "number" ? item.price * item.quantity : 0)
    );
  }, 0);
};

// 4. État initial
const { cart, total } = loadFromLocalStorage();
const initialState = {
  items: cart,
  total,
};

// 5. Slice Redux
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Ajouter au panier
    addToCart: (state, action) => {
      const { id, name, brand, imageUrl, pricingModel, price } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id && item.pricingModel === pricingModel
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          brand,
          imageUrl,
          pricingModel,
          price,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    // Modifier quantité
    updateQuantity: (state, action) => {
      const { id, pricingModel, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.pricingModel === pricingModel
      );

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    // Supprimer un item
    removeFromCart: (state, action) => {
      const { id, pricingModel } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.pricingModel === pricingModel)
      );

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state.items, state.total);
    },

    // Vider le panier
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
