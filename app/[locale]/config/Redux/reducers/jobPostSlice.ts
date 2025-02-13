import { createSlice } from "@reduxjs/toolkit";

// Local Storage se initial state set karna
const initialState = {
  userId: localStorage.getItem("JobPostUserId") || null,
};

const jobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("JobPostUserId", action.payload); // localStorage update
    },
    clearUserId: (state) => {
      state.userId = null;
      localStorage.removeItem("JobPostUserId"); // localStorage se remove karna
    },
  },
});

export const { setUserId, clearUserId } = jobPostSlice.actions;
export default jobPostSlice.reducer;
