// redux/slices/jobSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  serviceData: {
    ServiceDate: '',
    startTime: '',
    endTime: '',
  },
};

// Create a slice of state
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServiceData: (state, action) => {
      state.serviceData = action.payload; // Update job data with payload
    },
  },
});

// Export the actions
export const { setServiceData } = serviceSlice.actions;

// Export the reducer to be used in the store
export default serviceSlice.reducer;
