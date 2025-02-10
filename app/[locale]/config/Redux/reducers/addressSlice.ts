import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  setLocation: {
    location: '',
    instructions: '',
  },
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.setLocation = action.payload;
    },
  },
});

export const { setLocation } = formSlice.actions;
export default formSlice.reducer;
