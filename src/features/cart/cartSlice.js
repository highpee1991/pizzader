import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: '',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  //  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteCart(state, action) {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseCartQuantity(state, action) {
      //payload = pizzId
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );

      if (index !== -1) {
        const item = state.cart[index];
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseCartQuantity(state, action) {
      //payload = pizzId
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );

      let item;
      if (index !== -1) {
        item = state.cart[index];
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item.quantity === 0) cartSlice.caseReducers.deleteCart(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addCartItem,
  deleteCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItem = (state) => state.cart.cart;

export const getCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce((sum, price) => sum + price.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
