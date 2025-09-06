import React from "react";
import { Button } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";

const OrderFailedPopup = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center shadow-lg max-w-sm">
        <AiOutlineCloseCircle className="text-6xl text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Order Failed!</h2>
        <Button variant="contained" color="error" onClick={onClose}>
          Try Again
        </Button>
      </div>
    </div>
  );
};
export default OrderFailedPopup;
