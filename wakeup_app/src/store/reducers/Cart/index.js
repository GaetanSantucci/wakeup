import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openCalendar: false,
  cartItems: {},
  bookingDate: ''
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
          id,
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
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems[id];

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        const updatedItem = {
          ...existingItem,
          quantity
        };

        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: updatedItem
          }
        };
      }

      return state; // Return the original state if the item doesn't exist
    },
    deleteItems: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems[id];

      if (existingItem && existingItem.quantity > 1) {
        // If the item exists and its quantity is greater than 1, update its quantity
        const updatedItem = {
          ...existingItem,
          quantity
        };

        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: updatedItem
          }
        };
      } else {
        // If the item exists but its quantity is 1, remove it from the cart
        const { [id]: removedItem, ...restCartItems } = state.cartItems;

        return {
          ...state,
          cartItems: restCartItems
        };
      }
    },
    resetAllCartItems: (state) => {
      return {
        ...state,
        cartItems: {}
      }
    },
    addNewBookingDate: (state, action) => {
      return {
        ...state,
        bookingDate: action.payload
      }
    }
  }
});

export const { toggleOpenCalendar, addToCart, addItems, deleteItems, resetAllCartItems, addNewBookingDate } = cartSlice.actions;

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