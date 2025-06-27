import { configureStore } from "@reduxjs/toolkit";
import sidePanelSliceReducer from "./slices/sidePanelSlice";
export const store = configureStore({
  reducer: {
    sidePanel: sidePanelSliceReducer,
  },
});
