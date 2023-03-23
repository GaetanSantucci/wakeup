import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modaleIsOpen: true,
  menuIsOpen: false,
  cartIsOpen: false,
  scrollYPosition: null,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleModale: (state) => {
      return {
        ...state,
        modaleIsOpen: !state.modaleIsOpen
      }
    },

    handleChangeMenu: (state) => {
      return {
        ...state,
        menuIsOpen: !state.menuIsOpen
      }
    },

    toggleCartModale: (state) => {
      return {
        ...state,
        cartIsOpen: !state.cartIsOpen
      }
    },

    changeScrollYPosition: (state, action) => {
      return {
        ...state,
        scrollYPosition: action.payload
      }
    }
  }
});

export const { toggleModale, handleChangeMenu, toggleCartModale, changeScrollYPosition } = settingsSlice.actions;
export default settingsSlice.reducer;
