import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from '../redux/Slices/productModalSlice'
import cartPanelSlicereducer from "../redux/Slices/cartPanelSlice";
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
    cartPanel: cartPanelSlicereducer,
  },
});