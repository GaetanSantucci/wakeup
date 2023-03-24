import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: 'alexia',
    lastname: '',
    firstname: '',
    address: {
      label: '',
      city: '',
      zipcode: '',
    },
    isAdmin: false,
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    inputValue: (state, action) => {
      console.log('state: ', state.user.email);
      // const value = action.payload.value;

      // console.log('value dans le reducer: ', value);
      // const input = action.payload.inputType;
      // console.log('input dans le reducer: ', input);
      state
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.inputType]: action.payload.value
        }
      }
    }
  }
});

export const { inputValue } = userSlice.actions;
export default userSlice.reducer;