import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
export const CartItems = (props) => {
  const [selectedSize, setSelectedSize] = useState(props.size || "S");
  const [anchorElSize, setAnchorElSize] = useState(null);
  const openSize = Boolean(anchorElSize);
  const handleClickSize = (event) => {
    setAnchorElSize(event.currentTarget);
  };
  const handleCloseSize = (size) => {
    setAnchorElSize(null);
    if (typeof size === "string") {
      setSelectedSize(size);
    }
  };
  const [selectedQty, setSelectedQty] = useState(props.qty || 1);
  const [anchorElQty, setAnchorElQty] = useState(null);
  const openQty = Boolean(anchorElQty);
  const handleClickQty = (event) => {
    setAnchorElQty(event.currentTarget);
  };
  const handleCloseQty = (qty) => {
    setAnchorElQty(null);
    if (typeof qty === 'number') {
      setSelectedQty(qty);
    }
  };
  return (
    <div className="cartItem w-full p-3 flex border-b border-gray-200  gap-4">
      <div className="img w-[10%] rounded-md overflow-hidden">
        <Link to="/product-details/7845">
          <img
            src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
            className="w-full"
            alt=""
          />
        </Link>
      </div>
      <div className="info w-[90%] relative">
        <IoMdClose className="absolute right-0 text-xl cursor-pointer link transition" />
        <span className="text-md font-semibold text-gray-400">Levis</span>
        <h3 className="font-semibold text-lg transition link">
          <Link>A-Line Kurti With Sharara & Dupatta</Link>
        </h3>
        <Rating name="size-small" defaultValue={4} readOnly size="small" />
        <div className="flex items-center gap-4 mt-2">
          <div className="relative">
            <span
              className="flex items-center justify-center bg-[#f1f1f1] text-xs  py-1 px-2 rounded-md cursor-pointer"
              onClick={handleClickSize}
            >
              Size: {selectedSize} &nbsp; <GoTriangleDown />
            </span>
            <Menu
              id="basic-Size"
              anchorEl={anchorElSize}
              open={openSize}
              onClose={handleCloseSize}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <MenuItem key={size} onClick={() => handleCloseSize(size)}>
                  {size}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="relative">
            <span
              onClick={handleClickQty}
              className="flex items-center justify-center bg-[#f1f1f1] text-xs py-1 px-2 rounded-md cursor-pointer"
            >
              Qty: {selectedQty} &nbsp; <GoTriangleDown />
            </span>
            <Menu
              id="basic-Qty"
              anchorEl={anchorElQty}
              open={openQty}
              onClose={handleCloseQty}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <MenuItem key={qty} onClick={() => handleCloseQty(qty)}>
                  {qty}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="price text-primary text-[14px] font-[600]">
            $58.00
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary text-[14px] font-[600]">
            50% OFF
          </span>
        </div>
      </div>
    </div>
  );
};
