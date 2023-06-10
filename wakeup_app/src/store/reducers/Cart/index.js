import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // openCalendar: false,
  // cartItems: {},
  cart: [],
  bookingDate: '',
  totalAmount: 0,
  totalQuantity: 0,
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
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      console.log('state.cart:', state.cart);
      console.log('item:', item);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      console.log('item:', item);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
  // toggleOpenCalendar: (state) => {
  //   return {
  //     ...state,
  //     openCalendar: !state.openCalendar
  //   }
  // },

  // addToCart: (state, action) => {
  //   const { id, name, price, img } = action.payload;
  //   const existingItem = state.cartItems[id];

  //   if (existingItem) {
  //     // If the item already exists in the cart, increment its quantity
  //     const updatedItem = {
  //       ...existingItem,
  //       quantity: existingItem.quantity + 1
  //     };

  //     return {
  //       ...state,
  //       cartItems: {
  //         ...state.cartItems,
  //         [id]: updatedItem
  //       }
  //     };
  //   } else {
  //     // If the item doesn't exist in the cart, add it with a quantity of 1
  //     const newItem = {
  //       id,
  //       name,
  //       price,
  //       img,
  //       quantity: 1
  //     };

  //     return {
  //       ...state,
  //       cartItems: {
  //         ...state.cartItems,
  //         [id]: newItem
  //       }
  //     };
  //   }
  // },

  // addItems: (state, action) => {
  //   const { id, quantity } = action.payload;
  //   const existingItem = state.cartItems[id];

  //   if (existingItem) {
  //     // If the item already exists in the cart, update its quantity
  //     const updatedItem = {
  //       ...existingItem,
  //       quantity
  //     };

  //     return {
  //       ...state,
  //       cartItems: {
  //         ...state.cartItems,
  //         [id]: updatedItem
  //       }
  //     };
  //   }

  //   return state; // Return the original state if the item doesn't exist
  // },
  // deleteItems: (state, action) => {
  //   const { id, quantity } = action.payload;
  //   const existingItem = state.cartItems[id];

  //   if (existingItem && existingItem.quantity > 1) {
  //     // If the item exists and its quantity is greater than 1, update its quantity
  //     const updatedItem = {
  //       ...existingItem,
  //       quantity
  //     };

  //     return {
  //       ...state,
  //       cartItems: {
  //         ...state.cartItems,
  //         [id]: updatedItem
  //       }
  //     };
  //   } else {
  //     // If the item exists but its quantity is 1, remove it from the cart
  //     const { [id]: removedItem, ...restCartItems } = state.cartItems;

  //     return {
  //       ...state,
  //       cartItems: restCartItems
  //     };
  //   }
  // },
  // resetAllCartItems: (state) => {
  //   return {
  //     ...state,
  //     cartItems: {}
  //   }
  // },
  // addNewBookingDate: (state, action) => {
  //   console.log('action:', action);
  //   return {
  //     ...state,
  //     bookingDate: action.payload
  //   }
  // }
  // }
});

export const { toggleOpenCalendar, addToCart, incrementQuantity, decrementQuantity, removeItem /* addItems, deleteItems, resetAllCartItems, addNewBookingDate */ } = cartSlice.actions;

// Add the selectTotalAmount selector function
// export const selectTotalAmount = (state) => {
//   const { cartItems } = state.cart;
//   let totalAmount = 0;
//   let cartQty = 0;
//   let cartInfo = '';

//   // Iterate over the cartItems and calculate the total amount
//   Object.values(cartItems).forEach((item) => {
//     cartQty += item.quantity;
//     totalAmount += item.price * item.quantity;
//     cartInfo = { cartQty, newTotal: totalAmount.toFixed(2) };
//   });
//   return cartInfo;
//   // return totalAmount.toFixed(2); // Return total amount with two decimal places
// };

export default cartSlice.reducer;