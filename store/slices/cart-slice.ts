import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex((item) => item.product.id === action.payload.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex((item) => item.product.id === action.payload.id);

      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },

    // Clear items from cart
    clearCart: (state) => {
      state.items = [];
    },

    // Reset state
    reset: () => initialState,
  },
});

export const getCartItems = (state: { cart: CartState }) => state.cart.items;
export const getCartTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.product.price! * item.quantity, 0);
export const getCartTotalItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
