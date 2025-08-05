import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catData: [],
};
const catDataSlice = createSlice({
  name: "CatData",
  initialState,
  reducers: {
    setCatData: (state, action) => {
      state.catData = action.payload;
    },
  },
});
export const { setCatData } = catDataSlice.actions;
export default catDataSlice.reducer;
