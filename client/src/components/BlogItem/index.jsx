import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
export const BlogItem = () => {
  return (
    <div className="blogItem py-6 group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/8/1105_813/b-blog-6.jpg"
          alt="blog image"
          className="w-full group-hover:scale-105 duration-500 transition-all"
        />
        <span className="absolute bg-primary rounded-md p-1 bottom-[15px] right-[15px] z-50 flex items-center justify-center gap-2 text-white text-[12px] font-[500]">
          <IoTimeOutline className="text-[18px]" /> 5 APRIL, 2025
        </span>
      </div>
      <div className="info py-4">
        <Link to="/" className="link transition text-black">
          <h2 className="text-[18px] font-[600]  mb-1">
            Nullam ullamcorper ornare molestie
          </h2>
        </Link>
        <p className="text-[14px] font-[400] text-[#707070] mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
        
        <Link to="/" className="link font-[500] transition hover:underline inline-flex items-center gap-2">
          Read More <HiArrowLongRight />
        </Link>
      </div>
    </div>
  );
};
