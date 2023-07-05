import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileNavbar: false,
  menuIsOpen: false,
  cartIsOpen: false,
  loginModale: false,
  profileIsOpen: false,
  scrollYPosition: null,
  isRegister: false,
  // showPassword: false,
  // showPasswordConfirm: false,
  isPasswordInputFocused: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleLoginModale: (state) => {
      return {
        ...state,
        loginModale: !state.loginModale
      }
    },
    toggleShowNavbar: (state) => {
      return {
        ...state,
        mobileNavbar: !state.mobileNavbar
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

    toggleProfileModale: (state) => {
      return {
        ...state,
        profileIsOpen: !state.profileIsOpen
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
    // toggleShowPassword: (state) => {
    //   return {
    //     ...state,
    //     showPassword: !state.showPassword
    //   }
    // },
    // toggleShowPasswordConfirm: (state) => {
    //   return {
    //     ...state,
    //     showPasswordConfirm: !state.showPasswordConfirm
    //   }
    // },

    handleInputFocused: (state, action) => {
      return {
        ...state,
        isPasswordInputFocused: action.payload
      }
    },

  }
});

export const { toggleLoginModale, handleChangeMenu, toggleCartModale, changeScrollYPosition, openRegisterForm, handleInputFocused, toggleProfileModale, toggleShowNavbar } = settingsSlice.actions;
export default settingsSlice.reducer;
