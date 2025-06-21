import { configureStore } from "@reduxjs/toolkit";
import productModalSlicereducer from '../redux/Slices/productModalSlice'
export const store = configureStore({
  reducer: {
    proModal: productModalSlicereducer,
  },
});