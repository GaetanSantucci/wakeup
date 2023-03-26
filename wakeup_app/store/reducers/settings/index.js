import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modaleIsOpen: true,
  menuIsOpen: false,
  cartIsOpen: false,
  scrollYPosition: null,
  isRegister: false,
  showPassword: false,
  showPasswordConfirm: false,
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
    },

    openRegisterForm: (state) => {
      return {
        ...state,
        isRegister: !state.isRegister
      }
    },

    toggleShowPassword: (state) => {
      return {
        ...state,
        showPassword: !state.showPassword
      }
    },
    toggleShowPasswordConfirm: (state) => {
      return {
        ...state,
        showPasswordConfirm: !state.showPasswordConfirm
      }
    }
  }
});

export const { toggleModale, handleChangeMenu, toggleCartModale, changeScrollYPosition, openRegisterForm, toggleShowPassword, toggleShowPasswordConfirm } = settingsSlice.actions;
export default settingsSlice.reducer;
