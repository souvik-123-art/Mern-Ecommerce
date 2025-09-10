import Button from "@mui/material/Button";
import React from "react";

export const QtyBox = ({
  quantity,
  setQuantity,
  count,
  onUpdate,
  component,
}) => {
  const plusVal = () => {
    if (quantity < count) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      if (component === "proItem") {
        onUpdate(newQty);
      }
    }
  };

  const minusVal = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (component === "proItem") {
        onUpdate(newQty);
      }
    }
  };

  return (
    <div className="qtybox flex items-center gap-2 md:gap-4">
      <Button
        onClick={minusVal}
        disabled={quantity === 1}
        className={`!w-10 !h-10 !min-w-[40px] !rounded-full !text-primary !bg-gray-200 !text-lg 
                ${
                  quantity === 1
                    ? "!opacity-40 !cursor-not-allowed"
                    : "hover:!bg-gray-300"
                }`}
      >
        -
      </Button>

      <input
        className="outline-none bg-transparent w-12 md:w-16 text-center text-lg"
        type="number"
        readOnly
        value={quantity}
      />

      <Button
        disabled={count === quantity}
        onClick={plusVal}
        className={`!w-10 !h-10 !min-w-[40px] !rounded-full !text-primary !bg-gray-200 !text-lg 
                ${
                  count === quantity
                    ? "!opacity-40 !cursor-not-allowed"
                    : "hover:!bg-gray-300"
                }`}
      >
        +
      </Button>
    </div>
  );
};
