import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lgBanners: [],
  bannerV1: [],
};
const homeBannerSlice = createSlice({
  name: "HomeBannerData",
  initialState,
  reducers: {
    setLgBanners: (state, action) => {
      state.lgBanners = action.payload;
    },
    setBannerV1: (state, action) => {
      state.bannerV1 = action.payload;
    },
  },
});
export const { setLgBanners, setBannerV1 } = homeBannerSlice.actions;
export default homeBannerSlice.reducer;
