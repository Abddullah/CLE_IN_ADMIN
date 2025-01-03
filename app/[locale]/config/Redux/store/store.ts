import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../reducers/locationSlice"; 
import planReducer from "../reducers/planSlice"; 
import categoriesReducer from "../reducers/categorySlice"; 





const store = configureStore({
  reducer: {
    location: locationReducer,
    plan: planReducer,
    category: categoriesReducer, 
   
  },
});

export default store;
