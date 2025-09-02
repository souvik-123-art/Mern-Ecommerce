import Button from "@mui/material/Button";
import React, { useState } from "react";

export const QtyBox = (props) => {
  const [qtyVal, setQtyVal] = useState(1);
  const plusVal = () => {
    setQtyVal(qtyVal + 1);
  };
  const minusVal = () => {
    if (qtyVal > 1) {
      setQtyVal(qtyVal - 1);
    }
  };
  return (
    <div className="qtybox flex items-center gap-1">
      <Button
        onClick={minusVal}
        disabled={qtyVal === 1 && true}
        className={`!w-[40px] !min-w-[40px] !rounded-full
                    !text-primary !bg-gray-200
                   !h-[40px] !text-lg ${qtyVal === 1 && "opacity-40"}`}
      >
        -
      </Button>
      <input
        className="outline-none w-14 text-center text-lg"
        type="number"
        onChange={(e) => setQtyVal(e.target.value)}
        readOnly
        value={qtyVal}
      />
      <Button
        disabled={props?.count === qtyVal}
        onClick={plusVal}
        className={`!w-[40px] !min-w-[40px] !rounded-full
                    !text-primary !bg-gray-200
                   !h-[40px] !text-lg ${
                     props?.count === qtyVal && "opacity-40"
                   }`}
      >
        +
      </Button>
    </div>
  );
};
