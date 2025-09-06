import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  users: [],
};
const userDetailsSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setUserDetails, setUsers } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
