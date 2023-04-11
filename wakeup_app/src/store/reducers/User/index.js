import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    email: '',
    password: '',
    confirmPwd: '',
    lastname: '',
    firstname: '',
    phone: '',
    address: {
      label: '',
      name: '',
      complement: '',
      city: '',
      postcode: '',
    },
    role: false,
    newsletter_optin: false,
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
      console.log('action: ', action.payload);
      const { inputType, value } = action.payload;

      // Convert "on" to true for the newsletter_optin field
      const newValue = inputType === 'newsletter_optin' ? value === 'on' : value;

      return {
        ...state,
        user: {
          ...state.user,
          [inputType]: newValue,
          // address: {
          //   ...state.user.address,
          //   [inputType]: newValue,
          // }
        }
      }
    },

    userUpdate: (state, action) => {
      const { id, email, lastname, firstname, phone, address, role, newsletter_optin } = action.payload;
      const { label, name, city, complement, postcode } = address;

      return {
        ...state,
        user: {
          ...state.user,
          id,
          email,
          password: state.user.password,
          lastname,
          firstname,
          phone,
          address: {
            // ...state.user.address,
            label,
            name,
            complement,
            city,
            postcode,
          },
          role,
          newsletter_optin
        },
        isLogged: true
      }
    },

    setSuccessMessage: (state, action) => {
      return {
        ...state,
        isSuccess: action.payload
      }
    },

    setErrorMessage: (state, action) => {
      return {
        ...state,
        isError: action.payload
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
          // phone: '',
          // address: {
          //   // ...state.user.address,
          //   label: '',
          //   name: '',
          //   city: '',
          //   postcode: ''
          // },
          // role: '',
          // newsletter_optin:
        },
        isLogged: false
      }
    },

    setAddress: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          email: state.user.email,
          lastname: state.user.lastname,
          firstname: state.user.firstname,
          phone: state.user.phone,
          newsletter_optin: state.user.newsletter_optin,
          address: {
            ...state.user.address,
            label: action.payload.label,
            name: action.payload.name,
            complement: action.payload.complement,
            city: action.payload.city,
            postcode: action.payload.postcode
          }
        }
      }
    },

    updateComplement: (state, action) => {
      state.user.address.complement = action.payload;
    },

    toggleCheckbox: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          newsletter_optin: action.payload
        }
      }
    }
  }
});

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser, setAddress, userUpdate, updateComplement, toggleCheckbox } = userSlice.actions;
export default userSlice.reducer;