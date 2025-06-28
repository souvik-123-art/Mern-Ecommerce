import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action)=>{
        state.isLogin = action.payload
    }
  },
});
export const { setIsLogin } = authSlice.actions;
export default authSlice.reducer;
