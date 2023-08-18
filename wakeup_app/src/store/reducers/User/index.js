import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    email: 'gaetan.santucci@outlook.com',
    password: '',
    confirmPwd: '',
    lastname: 'Santucci',
    firstname: 'Tess',
    phone: '0629393202',
    address: {
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
      const { inputType, value } = action.payload;
      console.log('inputType:', inputType);
      if (inputType === 'complement' || 'postcode ' || 'city' || 'name') state.user.address[inputType] = action.payload.value;
      const newValue = inputType === 'newsletter_optin' ? value === 'on' : value;
      state.user[inputType] = newValue;
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
            ...state.user.address,
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

    updateComplement: (state, action) => {
      state.user.address.complement = action.payload;
    },
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

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser, userUpdate, updateComplement, toggleCheckbox } = userSlice.actions;
export default userSlice.reducer;