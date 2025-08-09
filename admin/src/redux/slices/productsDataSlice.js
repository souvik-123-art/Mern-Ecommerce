import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proData: [],
};
const proDataSlice = createSlice({
  name: "ProData",
  initialState,
  reducers: {
    setProData: (state, action) => {
      state.proData = action.payload;
    },
  },
});
export const { setProData } = proDataSlice.actions;
export default proDataSlice.reducer;
