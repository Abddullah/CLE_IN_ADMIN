import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  categories: { [key: string]: string[] };
}

const initialState: CategoriesState = {
  categories: {},
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<{ [key: string]: string[] }>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
