import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartPanelOpen: false,
};
const cartPanelSlice = createSlice({
  name: "cartPanelDrawer",
  initialState,
  reducers: {
    OpenCartPanel: (state) => {
      state.cartPanelOpen = true;
    },
    CloseCartPanel: (state) => {
      state.cartPanelOpen = false;
    },
  },
});
export const { OpenCartPanel, CloseCartPanel } = cartPanelSlice.actions;
export default cartPanelSlice.reducer;
