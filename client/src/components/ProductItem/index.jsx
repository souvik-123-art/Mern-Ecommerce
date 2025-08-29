import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";
import { productModal } from "../../redux/Slices/productModalSlice";
import { useDispatch } from "react-redux";
export const ProductItem = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="productItem rounded-xl overflow-hidden border">
      <div className="imgWrapper group relative w-full overflow-hidden">
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
      <div className="info p-3 py-5 bg-[#fafafa]">
        <h6 className="text-[13px] mb-1 text-gray-500">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.brand}
          </Link>
        </h6>
        <h3 className="text-[15px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)] truncate">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.name}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={Number(props?.data?.rating)}
          precision={0.5}
          readOnly
          size="small"
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[15px] font-[600]">
            ₹{props?.data?.price.toLocaleString("en-IN")}
          </span>
        </div>
        <Button className="!px-4 w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1 !mt-3">
          <FaOpencart className="text-xl" /> Add To Cart
        </Button>
      </div>
    </div>
  );
};
