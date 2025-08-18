import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModalOpen: {
    open: false,
    id: "",
  },
};
const productModalSlice = createSlice({
  name: "proModal",
  initialState,
  reducers: {
    productModal: (state, action) => {
      state.productModalOpen = action.payload;
    },
  },
});
export const { productModal } = productModalSlice.actions;
export default productModalSlice.reducer;
