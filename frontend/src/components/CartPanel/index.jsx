import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CloseCartPanel } from "../../redux/Slices/cartPanelSlice";
export const CartPanel = () => {
  const dispatch = useDispatch();
  const isCartPanelOpen = useSelector((state) => state.cartPanel.cartPanelOpen);
  return (
    <Drawer
      open={isCartPanelOpen}
      anchor="right"
      onClose={() => dispatch(CloseCartPanel())}
      PaperProps={{
        sx: {
          width: 300,
        },
      }}
    >
      <div className="p-4 w-full flex justify-between items-center ">
        <h4>Shopping Cart(1)</h4>
        <IoMdClose
          className="text-2xl link transition cursor-pointer"
          onClick={() => dispatch(CloseCartPanel())}
        />
      </div>
    </Drawer>
  );
};
