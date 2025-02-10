import { createSlice } from "@reduxjs/toolkit";

// Initial state of the form
const initialState = {
  provider: '',
  category: '',
  subcategory: '',
  hour: 1,
  professional: 1,
  roomsizes: '',
  numberofrooms: '',
  needmaterial: '',
  Additionalservices: [],
  location: { lng: 0, lat: 0 },
  plan: { value: '' }
};
 
// Creating the slice for the form
const jobSlice = createSlice({
  name: 'job',  // Name of the slice
  initialState,
  reducers: {
    // Reducer to handle the setting of job data
    setJobSlice: (state, action) => {
      // Merging the incoming form data (action.payload) with the state
      return {
        ...state,
        ...action.payload,  // Overwriting the state with the new form data
      };
    },
  },
});

// Export the action and reducer
export const { setJobSlice } = jobSlice.actions;
export default jobSlice.reducer;
