import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogData: [],
};
const blogDataSlice = createSlice({
  name: "BlogData",
  initialState,
  reducers: {
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
  },
});
export const { setBlogData } = blogDataSlice.actions;
export default blogDataSlice.reducer;
