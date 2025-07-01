import React from "react";
import { FaRegImages } from "react-icons/fa6";

const UploadBox = (props) => {
  return (
    <div className="uploadbox p-2 rounded-md overflow-hidden border border-dashed border-black/30 h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center flex-col gap-2 justify-center text-gray-500 relative">
      <FaRegImages className="text-5xl cursor-pointer" />
      <h4 className="text-md font-semibold cursor-pointer">Image Upload</h4>
      <input
        type="file"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default UploadBox;
