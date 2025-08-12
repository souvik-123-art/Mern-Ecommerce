import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proData: [],
  prodRam: [],
  prodSize: [],
  prodWeight: [],
};
const proDataSlice = createSlice({
  name: "ProData",
  initialState,
  reducers: {
    setProData: (state, action) => {
      state.proData = action.payload;
    },
    setProdRam: (state, action) => {
      state.prodRam = action.payload;
    },
    setProdSize: (state, action) => {
      state.prodSize = action.payload;
    },
    setProdWeight: (state, action) => {
      state.prodWeight = action.payload;
    },
  },
});
export const { setProData, setProdRam, setProdSize, setProdWeight } =
  proDataSlice.actions;
export default proDataSlice.reducer;
