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
    <div className="cartItem w-full p-3 flex border-b border-gray-200  gap-4">
      <div className="img w-[10%] rounded-md overflow-hidden">
        <Link to={`/product-details/${data?.productId}`}>
          <img src={data?.image} className="w-full" alt="" />
        </Link>
      </div>
      <div className="info w-[90%] relative">
        <IoMdClose
          onClick={handleRemoveToMyList}
          className="absolute right-0 text-xl cursor-pointer link transition"
        />
        <span className="text-md font-semibold text-gray-400">
          {data?.brand}
        </span>
        <h3 className="font-semibold text-lg transition link">
          <Link to={`/product-details/${data?.productId}`}>
            {data?.productTitle}
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} readOnly size="small" />
        <div className="flex items-center gap-4 mt-2">
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
