import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myListData: [],
};
const myListDataSlice = createSlice({
  name: "MyListData",
  initialState,
  reducers: {
    setMyListData: (state, action) => {
      state.myListData = action.payload;
    },
  },
});
export const { setMyListData } = myListDataSlice.actions;
export default myListDataSlice.reducer;
