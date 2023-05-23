import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openCalendar: false,
  cart: {
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleOpenCalendar: (state) => {
      console.log("openCalendar :", state.openCalendar);
      return {
        ...state,
        openCalendar: !state.openCalendar
      }
    },

    addToCart: (state, action) => {
      const { name, id, price } = action.payload;
      console.log('price:', price);
      console.log('name:', name);

      return {
        ...state,
        cart: {
          ...state,
          id,
          name,
          price
        }
      }
      state.push({ name, id, price });
    },

    addItems: (state, action) => {
      return {
        ...state,
        cart: {
          ...state.cart
        }
      }
    },
    deleteItems: (state, action) => {
      return {
        ...state,
        cart: {
          ...state.cart
        }
      }
    },
  }
});

export const { toggleOpenCalendar, addToCart, addItems, deleteItems } = cartSlice.actions;
export default cartSlice.reducer;