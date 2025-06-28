import React from "react";
import { TbSearch } from "react-icons/tb";

const SearchBox = () => {
  return (
    <div className="w-full rounded-md h-auto relative overflow-hidden">
      <TbSearch className="text-xl pointer-events-none text-gray-500 absolute left-4 top-2.5 " />

      <input
        type="text" placeholder="Search products here"
        className="w-full h-[40px] p-2 pl-10 outline-none border border-black/10 bg-[#f1f1f1] text-sm rounded-md focus:border-primary/50"
      />
    </div>
  );
};

export default SearchBox;
