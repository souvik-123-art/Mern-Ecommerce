import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenFullScreenPanel: {
    open: false,
    model: ''
  },
};
const fullScreenPanelSlice = createSlice({
  name: "fullScreenPanel",
  initialState,
  reducers: {
    setIsOpenFullScreenPanel: (state, action) => {
      state.isOpenFullScreenPanel = action.payload;
    },
  },
});

export const { setIsOpenFullScreenPanel } = fullScreenPanelSlice.actions;
export default fullScreenPanelSlice.reducer;
