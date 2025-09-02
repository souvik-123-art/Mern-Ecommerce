import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proData: [],
  prodRam: [],
  prodSize: [],
  prodWeight: [],
  proReview: [],
};
const proDataSlice = createSlice({
  name: "ProData",
  initialState,
  reducers: {
    setProData: (state, action) => {
      state.proData = action.payload;
    },
    setProdRam: (state, action) => {
      state.prodRam = action.payload;
    },
    setProdSize: (state, action) => {
      state.prodSize = action.payload;
    },
    setProdWeight: (state, action) => {
      state.prodWeight = action.payload;
    },
    setProReview: (state, action) => {
      state.proReview = action.payload;
    },
  },
});
export const {
  setProData,
  setProdRam,
  setProdSize,
  setProdWeight,
  setProReview,
} = proDataSlice.actions;
export default proDataSlice.reducer;
