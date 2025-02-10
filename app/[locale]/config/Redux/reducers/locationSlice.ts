// locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  lng: number;
  lat: number;
}

const initialState: Location = {
  lng: 12.4964,
  lat: 41.9028, 
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.lng = action.payload.lng;
      state.lat = action.payload.lat;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
