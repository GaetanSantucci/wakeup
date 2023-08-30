import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    email: 'alexia.pappano@hotmail.com',
    password: 'Pappano83!',
    confirmPwd: '',
    lastname: '',
    firstname: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postcode: '',
    },
    role: false,
    newsletter_optin: '',
  },
  isLogged: false,
  isSuccess: '',
  isError: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    inputValue: (state, action) => {
      const { inputType, value } = action.payload;
      console.log('value dans le store:', !value);
      console.log('inputType:', inputType);
      switch (inputType) {
        case 'line1':
        case 'line2':
        case 'postcode':
        case 'city':
          state.user.address[inputType] = value;
          break;
        case 'newsletter_optin':
          state.user[inputType] = !state.user.newsletter_optin;
          console.log('!state.user.newsletter_optin:', !state.user.newsletter_optin);
          break;
        default:
          state.user[inputType] = value;
          break;
      }
    },

    userUpdateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    userUpdate: (state, action) => {
      const { id, email, lastname, firstname, phone, address, role, newsletter_optin } = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          id,
          email,
          // password: state.user.password,
          lastname,
          firstname,
          phone,
          address: {
            ...state.user.address,
            ...address
          },
          role,
          newsletter_optin
        },
        isLogged: true
      }
    },
    resetUser: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          id: '',
          email: '',
          password: '',
          confirmPwd: '',
        },
        isLogged: false
      }
    },


    // updateComplement: (state, action) => {
    //   state.user.address.complement = action.payload;
    // },
    setSuccessMessage: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.isError = action.payload;
    },
    toggleCheckbox: (state, action) => {
      state.user.newsletter_optin = action.payload;
    },
  }
});

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser, userUpdate, userUpdateProfile, toggleCheckbox } = userSlice.actions;
export default userSlice.reducer;

