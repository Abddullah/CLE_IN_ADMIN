import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../reducers/locationSlice";
import planReducer from "../reducers/planSlice";
import categoriesReducer from "../reducers/categorySlice";
import jobReducer from "../reducers/jobSlice";
import formReducer from "../reducers/addressSlice";
import serviceReducer from '../reducers/ServiceTimeSlice'
import searchReducer from "../reducers/searchSlice"
import jobPostReducer from "../reducers/jobPostSlice";

const store = configureStore({
  reducer: {
    location: locationReducer,
    plan: planReducer,
    category: categoriesReducer,
    job: jobReducer,
    address: formReducer,
    service: serviceReducer,
    search: searchReducer,
    jobPost: jobPostReducer
  },
});

export default store;
