import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openCalendar: false,
  cartItems: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleOpenCalendar: (state) => {
      return {
        ...state,
        openCalendar: !state.openCalendar
      }
    },

    addToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const existingItem = state.cartItems[id];

      if (existingItem) {
        // If the item already exists in the cart, increment its quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };

        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: updatedItem
          }
        };
      } else {
        // If the item doesn't exist in the cart, add it with a quantity of 1
        const newItem = {
          name,
          price,
          quantity: 1
        };

        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: newItem
          }
        };
      }
    },


    addItems: (state, action) => {
      return {
        ...state,
        cartItems: {
          ...state.cart
        }
      }
    },
    deleteItems: (state, action) => {
      return {
        ...state,
        cartItems: {
          ...state.cart
        }
      }
    },
  }
});

export const { toggleOpenCalendar, addToCart, addItems, deleteItems } = cartSlice.actions;

// Add the selectTotalAmount selector function
export const selectTotalAmount = (state) => {
  const { cartItems } = state.cart;
  let totalAmount = 0;
  let cartQty = 0;
  let cartInfo = '';

  // Iterate over the cartItems and calculate the total amount
  Object.values(cartItems).forEach((item) => {
    cartQty += item.quantity;
    totalAmount += item.price * item.quantity;
    cartInfo = { cartQty, newTotal: totalAmount.toFixed(2) };
  });
  return cartInfo;
  // return totalAmount.toFixed(2); // Return total amount with two decimal places
};

export default cartSlice.reducer;