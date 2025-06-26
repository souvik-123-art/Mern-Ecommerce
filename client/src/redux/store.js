import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from '../redux/Slices/productModalSlice'
import cartPanelSlicereducer from "../redux/Slices/cartPanelSlice";
import authSlicereducer from "../redux/Slices/authSlice";
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
    cartPanel: cartPanelSlicereducer,
    auth: authSlicereducer
  },
});