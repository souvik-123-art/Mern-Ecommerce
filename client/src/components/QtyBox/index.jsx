import Button from "@mui/material/Button";
import React from "react";

export const QtyBox = ({ quantity, setQuantity, count, onUpdate }) => {
  const plusVal = () => {
    if (quantity < count) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onUpdate(newQty); 
    }
  };

  const minusVal = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onUpdate(newQty); 
    }
  };

  return (
    <div className="qtybox flex items-center gap-1">
      <Button
        onClick={minusVal}
        disabled={quantity === 1}
        className={`!w-[40px] !min-w-[40px] !rounded-full
                    !text-primary !bg-gray-200
                   !h-[40px] !text-lg ${quantity === 1 && "opacity-40"}`}
      >
        -
      </Button>
      <input
        className="outline-none bg-transparent w-14 text-center text-lg"
        type="number"
        readOnly
        value={quantity}
      />
      <Button
        disabled={count === quantity}
        onClick={plusVal}
        className={`!w-[40px] !min-w-[40px] !rounded-full
                    !text-primary !bg-gray-200
                   !h-[40px] !text-lg ${count === quantity && "opacity-40"}`}
      >
        +
      </Button>
    </div>
  );
};
