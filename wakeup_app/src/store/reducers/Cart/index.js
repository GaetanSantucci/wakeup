import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage?.getItem('cart')) || [],
  bookingDate: '',
  deliveryCost: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    resetAllCartItems: (state) => {
      localStorage.clear('cart');
      return {
        ...state,
        cart: []
      }
    },
    addBookingDate: (state, action) => {
      return {
        ...state,
        bookingDate: action.payload
      }
    },
    getStorageCart: (state, action) => {
      return {
        ...state,
        cart: action.payload
      }
    },
    addDeliveryCost: (state, action) => {
      console.log('action:', action);
      return {
        ...state,
        deliveryCost: action.payload
      }
    }
  }
});

export const { toggleOpenCalendar, addToCart, addDeliveryCost, incrementQuantity, decrementQuantity, removeItem, resetAllCartItems, addBookingDate, getStorageCart } = cartSlice.actions;
export default cartSlice.reducer;