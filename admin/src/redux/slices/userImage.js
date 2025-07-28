import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previews: [],
};
const userImageSlice = createSlice({
  name: "userImage",
  initialState,
  reducers: {
    setPreviews: (state, action) => {
      state.previews = action.payload;
    },
  },
});
export const { setPreviews } = userImageSlice.actions;
export default userImageSlice.reducer;
