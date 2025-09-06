import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: [],
};
const orderDataSlice = createSlice({
  name: "ordertData",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
  },
});
export const { setOrderData } = orderDataSlice.actions;
export default orderDataSlice.reducer;
