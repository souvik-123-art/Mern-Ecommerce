import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaOpencart } from "react-icons/fa";
export const MyListItems = () => {
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
          <span className="price text-primary text-[14px] font-[600]">
            $58.00
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary text-[14px] font-[600]">
            50% OFF
          </span>
          <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
            <FaOpencart className="text-xl" /> Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
