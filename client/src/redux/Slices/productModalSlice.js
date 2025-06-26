import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productModalOpen: false,
};
const productModalSlice = createSlice({
  name: "proModal",
  initialState,
  reducers: {
    openProductModal: (state) => {
      state.productModalOpen = true;
    },
    closeProductModal: (state) => {
      state.productModalOpen = false;
    },
  },
});
export const { openProductModal, closeProductModal } = productModalSlice.actions;
export default productModalSlice.reducer;