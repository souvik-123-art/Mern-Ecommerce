import { configureStore } from "@reduxjs/toolkit";
import sidePanelSliceReducer from "./slices/sidePanelSlice";
import authSlicereducer from "./slices/authSlice";
import fullScreenPanelSliceReducer from "./slices/fullScreenPanelSlice";
export const store = configureStore({
  reducer: {
    sidePanel: sidePanelSliceReducer,
    auth: authSlicereducer,
    fullScreenPanel: fullScreenPanelSliceReducer,
  },
});
