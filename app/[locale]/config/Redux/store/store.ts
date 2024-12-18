import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../reducers/locationSlice'; // Correct import path

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export default store;
