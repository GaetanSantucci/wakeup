import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
    confirmPwd: '',
    lastname: '',
    firstname: '',
    address: {
      label: 'nul a chier',
      complement: '',
      city: '',
      zipcode: '',
    },
    isAdmin: false,
  },
  isSuccess: '',
  isError: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    inputValue: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.inputType]: action.payload.value,
          address: {
            ...state.user.address,
            [action.payload.inputType]: action.payload.value,
          }
        }
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
          ...state,
          email: '',
          password: '',
          confirmPwd: ''
        }
      }
    },

    setAddress: (state, action) => {
      console.log('action: ', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          address: {
            ...state.user.address,
            label: action.payload.label,
            complement: action.payload.complement,
            city: action.payload.city,
            zipcode: action.payload.postcode
          }
        }
      }
    }
  }
});

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser, setAddress } = userSlice.actions;
export default userSlice.reducer;