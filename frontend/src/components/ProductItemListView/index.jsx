import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
export const ProductItemListView = () => {
  return (
    <div className="productItem overflow-hidden border flex p-3 rounded-md">
      <div className="imgWrapper rounded-md w-[20%] group relative overflow-hidden">
        <div className="img h-[220px] overflow-hidden">
          <img
            src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
            className="w-full"
            alt=""
          />
          <img
            src="https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"
            className="w-full absolute left-0 top-0 group-hover:opacity-100 group-hover:scale-105 opacity-0 transition-all duration-1000"
            alt=""
          />
        </div>
        <span className="discount absolute top-[15px] left-[15px] z-50 bg-primary text-white rounded-md p-2 text-[12px] font-[500]">
          10%
        </span>
        <div className="actions group-hover:top-[15px] transition-all duration-500 absolute top-[-200px] right-[15px] z-50 flex items-center flex-col gap-2">
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <FaRegHeart className="text-[18px] pointer-events-none " />
          </Button>
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <GoGitCompare className="text-[18px] pointer-events-none " />
          </Button>
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <MdZoomOutMap className="text-[18px] pointer-events-none " />
          </Button>
        </div>
      </div>
      <div className="info py-3 px-8 w-[80%]">
        <h6 className="text-[15px] mb-2 text-gray-500">
          <Link to={"/"} className="link transition">
            CLAFOUTIS
          </Link>
        </h6>
        <h3 className="text-[18px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)]">
          <Link to={"/"} className="link transition">
            Men Opaque Casual Shirt...
          </Link>
        </h3>
        <p className="mb-2 text-[14px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
          fugit repellendus atque voluptate. Officia, nisi odio. Reiciendis nam
          dolorem suscipit.
        </p>
        <Rating
          name="size-small"
          defaultValue={4}
          readOnly
          size="medium"
          className="mb-2"
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary text-[18px] font-[600]">
            $58.00
          </span>
          <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
            <FaOpencart className="text-xl"/> Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
