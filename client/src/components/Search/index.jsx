import React from 'react'
import Button from "@mui/material/Button";
import { RiSearch2Line } from "react-icons/ri";
export const Search = () => {
  return (
    <div className="searchbox w-full h-[50px] bg-[#f1f1f1] rounded-full relative p-2 text-black">
      <input
        className="w-full h-full focus:outline-none bg-transparent pl-4 pr-12 text-[15px] placeholder-[#aaaaaa]"
        type="text"
        placeholder="Search for Products..."
      />
      <Button className="!absolute top-[7px] right-2 !w-[35px] !h-[35px] !min-w-[35px] !text-primary !rounded-full">
        <RiSearch2Line className="!text-9xl text-[#8a8a8a]" />
      </Button>
    </div>
  );
}
