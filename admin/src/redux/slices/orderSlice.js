import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: [],
  ordersCount: null,
};
const orderDataSlice = createSlice({
  name: "ordertData",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setOrdersCount: (state, action) => {
      state.ordersCount = action.payload;
    },
  },
});
export const { setOrderData, setOrdersCount } = orderDataSlice.actions;
export default orderDataSlice.reducer;
