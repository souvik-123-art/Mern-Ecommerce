import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from "../redux/Slices/productModalSlice";
import cartPanelSlicereducer from "../redux/Slices/cartPanelSlice";
import authSlicereducer from "../redux/Slices/authSlice";
import userDetailsSlicereducer from "../redux/Slices/userDetailsSlice";
import userImageSlicereducer from "../redux/Slices/userImage";
import fullScreenPanelSliceReducer from "../redux/Slices/fullScreenPanelSlice";
import userAddressSlicereducer from "../redux/Slices/userAddressSlice";
import catDataSliceReducer from "../redux/slices/categoryDataSlice";
import homeBannerSliceReducer from "../redux/slices/HomeBannerSlice";
import proDataSliceReducer from "../redux/slices/productsDataSlice";
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
    cartPanel: cartPanelSlicereducer,
    auth: authSlicereducer,
    UserDetails: userDetailsSlicereducer,
    userImage: userImageSlicereducer,
    userAddress: userAddressSlicereducer,
    catData: catDataSliceReducer,
    fullScreenPanel: fullScreenPanelSliceReducer,
    homeBannerData: homeBannerSliceReducer,
    proData: proDataSliceReducer,
  },
});
