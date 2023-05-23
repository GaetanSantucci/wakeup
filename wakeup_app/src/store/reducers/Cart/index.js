import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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

export const { addItems, deleteItems } = cartSlice.actions;
export default cartSlice.reducer;