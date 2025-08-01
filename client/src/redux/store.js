import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from "../redux/Slices/productModalSlice";
import cartPanelSlicereducer from "../redux/Slices/cartPanelSlice";
import authSlicereducer from "../redux/Slices/authSlice";
import userDetailsSlicereducer from "../redux/Slices/userDetailsSlice";
import userImageSlicereducer from "../redux/Slices/userImage";
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
    cartPanel: cartPanelSlicereducer,
    auth: authSlicereducer,
    UserDetails: userDetailsSlicereducer,
    userImage: userImageSlicereducer,
  },
});
