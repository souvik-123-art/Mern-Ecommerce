import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { productModal } from "../../redux/Slices/productModalSlice";
export const ProductItemListView = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="productItem overflow-hidden border flex p-3 rounded-md">
      <div className="imgWrapper rounded-md w-[20%] group relative overflow-hidden">
        <div className="img h-[220px] overflow-hidden">
          <img src={props?.data?.images[0]} className="w-full" alt="" />
          <img
            src={props?.data?.images[1]}
            className="w-full absolute left-0 top-0 group-hover:opacity-100 group-hover:scale-105 opacity-0 transition-all duration-1000"
            alt=""
          />
        </div>
        <span className="discount absolute top-[15px] left-[15px] z-50 bg-primary text-white rounded-md p-2 text-[12px] font-[500]">
          {props?.data?.discount}%
        </span>
        <div className="actions group-hover:top-[15px] transition-all duration-500 absolute top-[-200px] right-[15px] z-50 flex items-center flex-col gap-2">
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <FaRegHeart className="text-[18px] pointer-events-none " />
          </Button>
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <GoGitCompare className="text-[18px] pointer-events-none " />
          </Button>
          <Button
            onClick={() =>
              dispatch(
                productModal({
                  open: true,
                  id: props?.data?._id,
                })
              )
            }
            className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full"
          >
            <MdZoomOutMap className="text-[18px] pointer-events-none " />
          </Button>
        </div>
      </div>
      <div className="info py-3 px-8 w-[80%]">
        <h6 className="text-[15px] mb-2 text-gray-500">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.brand}
          </Link>
        </h6>
        <h3 className="text-[18px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)]">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.name}
          </Link>
        </h3>
        <p className="mb-2 text-[14px] text-black/50">
          {props?.data?.description}
        </p>
        <Rating
          name="size-small"
          value={Number(props?.data?.rating)}
          precision={0.5}
          readOnly
          size="medium"
          className="mb-2"
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
            ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[18px] font-[600]">
            ₹{props?.data?.price.toLocaleString("en-IN")}
          </span>
          <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
            <FaOpencart className="text-xl" /> Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
