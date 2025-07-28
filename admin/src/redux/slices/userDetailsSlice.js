import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};
const userDetailsSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});
export const { setUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
