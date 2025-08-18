import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lgBanners: [],
};
const homeBannerSlice = createSlice({
  name: "HomeBannerData",
  initialState,
  reducers: {
    setLgBanners: (state, action) => {
      state.lgBanners = action.payload;
    },
  },
});
export const { setLgBanners } = homeBannerSlice.actions;
export default homeBannerSlice.reducer;
