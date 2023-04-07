import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  user: {
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

    userUpdate: (state, action) => {
      const { email, lastname, firstname, phone, address, role } = action.payload;
      const { label, name, city, postcode } = address;
      console.log('label: ', label);


      return {
        ...state,
        user: {
          ...state.user,
          email,
          lastname,
          firstname,
          phone,
          address: {
            ...state.user.address,
            label,
            name,
            city,
            postcode,
          },
          role,
          isLogged: true
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
          ...state.user,
          email: '',
          password: '',
          confirmPwd: '',
          address: {
            ...state.user.address,
            label: '',
            name: '',
            city: '',
            postcode: ''
          },
          role: '',
          isLogged: false
        }
      }
    },

    setAddress: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
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
    }
  }
});


// export const updateUserInfo = createAction('user/update', (response) => {
//   const { email, lastname, firstname, phone, address, role } = response;
//   console.log('phone: ', phone);
//   console.log('lastname: ', lastname);
//   console.log('firstname: ', firstname);
//   console.log('email: ', email);
//   console.log('response: ', response);

//   return {
//     email,
//     lastname,
//     firstname,
//     phone,
//     address: {
//       label: address?.label || '',
//       name: address?.name || '',
//       complement: address?.complement || '',
//       city: address?.city || '',
//       postcode: address?.postcode || '',
//     },
//     isAdmin: role
//   };
// });

export const { inputValue, setSuccessMessage, setErrorMessage, resetUser, setAddress, userUpdate } = userSlice.actions;
export default userSlice.reducer;