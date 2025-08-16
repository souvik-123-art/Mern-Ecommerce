import { configureStore } from "@reduxjs/toolkit";
import sidePanelSliceReducer from "./slices/sidePanelSlice";
import authSlicereducer from "./slices/authSlice";
import fullScreenPanelSliceReducer from "./slices/fullScreenPanelSlice";
import userDetailsSlicereducer from "../redux/slices/userDetailsSlice";
import userImageSlicereducer from "../redux/slices/userImage";
import userAddressSlicereducer from "../redux/slices/userAddressSlice";
import catDataSliceReducer from "../redux/slices/categoryDataSlice";
import proDataSliceReducer from "../redux/slices/productsDataSlice";
import homeBannerSliceReducer from "../redux/slices/HomeBannerSlice";
export const store = configureStore({
  reducer: {
    sidePanel: sidePanelSliceReducer,
    auth: authSlicereducer,
    fullScreenPanel: fullScreenPanelSliceReducer,
    UserDetails: userDetailsSlicereducer,
    userImage: userImageSlicereducer,
    userAddress: userAddressSlicereducer,
    catData: catDataSliceReducer,
    proData: proDataSliceReducer,
    homeBannerData: homeBannerSliceReducer,
  },
});
