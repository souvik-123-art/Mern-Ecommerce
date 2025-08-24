import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
export const BlogItem = (props) => {
  return (
    <div className="blogItem py-6 group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src={props?.data?.images[0]}
          alt="blog image"
          className="w-full group-hover:scale-105 duration-500 transition-all"
        />
        <span className="absolute bg-primary rounded-md p-1 bottom-[15px] right-[15px] z-50 flex items-center justify-center gap-2 text-white text-[12px] font-[500]">
          <IoTimeOutline className="text-[18px]" />{" "}
          {new Date(props?.data?.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="info py-4">
        <Link to="/" className="link transition text-black">
          <h2 className="text-[15px] font-[600]  mb-2">{props?.data?.title}</h2>
        </Link>
        <p className="text-[14px] font-[400] text-[#707070] mb-4 line-clamp-2">
          {props?.data?.description}
        </p>

        <Link
          to="/"
          className="link font-[500] transition hover:underline inline-flex items-center gap-2"
        >
          Read More <HiArrowLongRight />
        </Link>
      </div>
    </div>
  );
};
