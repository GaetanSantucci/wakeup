import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
    confirmPwd: '',
    lastname: '',
    firstname: '',
    address: {
      label: '',
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
          [action.payload.inputType]: action.payload.value
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
      console.log('action: ', action.payload);
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
    }
  }
});

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser } = userSlice.actions;
export default userSlice.reducer;