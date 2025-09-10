import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { setMyListData } from "../../redux/Slices/myListSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const MyListItems = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveToMyList = () => {
    deleteData(`/api/myList/${data._id}`, {
      credentials: true,
    }).then((res) => {
      if (!res?.error) {
        toast.success(res?.data?.message);
        fetchDataFromApi("/api/myList").then((response) => {
          if (!response?.error) {
            dispatch(setMyListData(response?.data));
          }
        });
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
  return (
    <div className="cartItem w-full p-3 flex flex-col sm:flex-row border-b border-gray-200 gap-3 sm:gap-4">
      {/* Product Image */}
      <div className="img w-full sm:w-[10%] rounded-md overflow-hidden flex-shrink-0">
        <Link to={`/product-details/${data?.productId}`}>
          <img
            src={data?.image}
            className="w-full h-auto object-cover"
            alt=""
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="info w-full sm:w-[90%] relative flex flex-col gap-1">
        {/* Remove Button */}
        <IoMdClose
          onClick={handleRemoveToMyList}
          className="absolute top-2 right-0 text-xl cursor-pointer link transition"
        />

        {/* Brand */}
        <span className="text-md font-semibold text-gray-400">
          {data?.brand}
        </span>

        {/* Product Title */}
        <h3 className="font-semibold text-lg transition link truncate">
          <Link to={`/product-details/${data?.productId}`}>
            {data?.productTitle}
          </Link>
        </h3>

        {/* Rating */}
        <Rating name="size-small" defaultValue={4} readOnly size="small" />

        {/* Price Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
          <span className="price text-primary text-[14px] font-[600]">
            ₹ {data?.price.toLocaleString("en-IN")}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            ₹ {data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[14px] font-[600]">
            {data?.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};
