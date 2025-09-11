import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from "../redux/Slices/productModalSlice";
import cartPanelSlicereducer from "../redux/Slices/cartPanelSlice";
import authSlicereducer from "../redux/Slices/authSlice";
import userDetailsSlicereducer from "../redux/Slices/userDetailsSlice";
import userImageSlicereducer from "../redux/Slices/userImage";
import fullScreenPanelSliceReducer from "../redux/Slices/fullScreenPanelSlice";
import userAddressSlicereducer from "../redux/Slices/userAddressSlice";
import catDataSliceReducer from "../redux/Slices/categoryDataSlice";
import cartDataSliceReducer from "../redux/Slices/cartSlice";
import homeBannerSliceReducer from "../redux/Slices/HomeBannerSlice";
import proDataSliceReducer from "../redux/Slices/productsDataSlice";
import blogSliceReducer from "../redux/Slices/blogSlice";
import myListDataSliceReducer from "../redux/Slices/myListSlice";
import orderDataSliceReducer from "../redux/Slices/orderSlice";
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
    cartPanel: cartPanelSlicereducer,
    auth: authSlicereducer,
    UserDetails: userDetailsSlicereducer,
    userImage: userImageSlicereducer,
    userAddress: userAddressSlicereducer,
    catData: catDataSliceReducer,
    cartData: cartDataSliceReducer,
    fullScreenPanel: fullScreenPanelSliceReducer,
    homeBannerData: homeBannerSliceReducer,
    proData: proDataSliceReducer,
    blogData: blogSliceReducer,
    myListData: myListDataSliceReducer,
    orderData: orderDataSliceReducer,
  },
});
