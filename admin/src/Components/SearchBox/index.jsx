import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { TbSearch } from "react-icons/tb";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();
  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props?.setSearchQuery(e.target.value);
    // if (searchInput.current.value === "") {
    //   console.log("a");
    // }
  };
  return (
    <div className="w-full rounded-md h-auto relative overflow-hidden">
      <TbSearch className="text-xl pointer-events-none text-gray-500 absolute left-4 top-2.5 " />

      <input
        type="text"
        placeholder="Search here...."
        className="w-full h-[40px] p-2 pl-10 outline-none border border-black/10 bg-[#f1f1f1] text-sm rounded-md focus:border-primary/50"
        value={searchQuery}
        onChange={onChangeInput}
        ref={searchInput}
      />
    </div>
  );
};

export default SearchBox;
