import React from "react";
import { Link } from "react-router-dom";

export const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full group overflow-hidden rounded-md relative">
      <img
        src={props?.data?.images[0]}
        alt={props?.data?.bannerTitle}
        className="w-full transition-all duration-500 group-hover:scale-105"
      />
      <div
        className={`info absolute p-5 z-50 top-0 ${
          props.info === "left" ? "left-0" : "right-0 pl-16"
        } w-[75%] h-full flex items-center justify-center flex-col gap-2`}
      >
        <h2 className="text-[15px] font-['lexend_giga'] font-[600]">
          {props?.data?.bannerTitle}
        </h2>
        <span className="text-primary font-bold text-[23px] w-full text-center">
         <span className="text-black/70">only at</span> ₹{props?.data?.price.toLocaleString("en-IN")}/-
        </span>
        <Link to="/" className="underline link text-xl">
          Shop Now
        </Link>
      </div>
    </div>
  );
};
