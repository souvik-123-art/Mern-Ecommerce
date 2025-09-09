import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proData: [],
  // prodRam: [],
  // prodSize: [],
  // prodWeight: [],
  popularProData: [],
  featuredProData: [],
  singleProData: null,
  proReview: [],
  searchData: [],
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
    setSingleProData: (state, action) => {
      state.singleProData = action.payload;
    },
    setProReview: (state, action) => {
      state.proReview = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
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
export const {
  setProData,
  setPopularProData,
  setFeaturedProData,
  setSingleProData,
  setProReview,
  setSearchData,
} = proDataSlice.actions;
export default proDataSlice.reducer;
