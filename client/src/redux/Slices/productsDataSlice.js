import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proData: [],
  // prodRam: [],
  // prodSize: [],
  // prodWeight: [],
  popularProData: [],
  featuredProData: [],
};
const proDataSlice = createSlice({
  name: "ProData",
  initialState,
  reducers: {
    setProData: (state, action) => {
      state.proData = action.payload;
    },
    setPopularProData: (state, action) => {
      state.popularProData = action.payload;
    },
    setFeaturedProData: (state, action) => {
      state.featuredProData = action.payload;
    },

    // setProdRam: (state, action) => {
    //   state.prodRam = action.payload;
    // },
    // setProdSize: (state, action) => {
    //   state.prodSize = action.payload;
    // },
    // setProdWeight: (state, action) => {
    //   state.prodWeight = action.payload;
    // },
  },
});
export const { setProData, setPopularProData, setFeaturedProData } =
  proDataSlice.actions;
export default proDataSlice.reducer;
