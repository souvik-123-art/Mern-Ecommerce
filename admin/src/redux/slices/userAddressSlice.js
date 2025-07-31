import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: [],
};
const userAddressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});
export const { setAddress } = userAddressSlice.actions;
export default userAddressSlice.reducer;
