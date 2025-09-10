import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
export const BlogItem = (props) => {
  return (
    <div className="blogItem py-6 group max-w-md mx-auto">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src={props?.data?.images[0]}
          alt="blog image"
          className="w-full h-auto object-cover group-hover:scale-105 duration-500 transition-transform"
        />
        <span className="absolute bg-primary rounded-md p-1 bottom-4 right-4 z-50 flex items-center justify-center gap-2 text-white text-xs font-medium">
          <IoTimeOutline className="text-lg" />{" "}
          {new Date(props?.data?.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="info py-4 px-2">
        <Link to="/" className="link transition text-black block">
          <h2 className="text-base font-semibold mb-2 line-clamp-2">
            {props?.data?.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {props?.data?.description}
        </p>

        <Link
          to="/"
          className="link font-medium transition hover:underline inline-flex items-center gap-1"
        >
          Read More <HiArrowLongRight />
        </Link>
      </div>
    </div>
  );
};
