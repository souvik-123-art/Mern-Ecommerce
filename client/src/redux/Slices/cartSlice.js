import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};
const cartDataSlice = createSlice({
  name: "CartData",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
  },
});
export const { setCartData } = cartDataSlice.actions;
export default cartDataSlice.reducer;
