import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleModale: (state) => {
      return {
        ...state,
        isOpen: !state.isOpen
      }
    }
  }
});

export const { toggleModale } = settingsSlice.actions;
export default settingsSlice.reducer;
