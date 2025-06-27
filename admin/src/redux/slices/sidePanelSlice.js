import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidePanelOpen: true,
};
const sidePanelSlice = createSlice({
  name: "sidePanelDrawer",
  initialState,
  reducers: {
    OpenSidePanel: (state, action) => {
      state.sidePanelOpen = action.payload;
    },
  },
});
export const { OpenSidePanel } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;
