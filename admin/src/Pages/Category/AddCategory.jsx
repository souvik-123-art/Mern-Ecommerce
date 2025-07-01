import React from "react";
import UploadBox from "../../Components/UploadBox";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
const AddCategory = () => {
  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3">
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Name</h3>
              <input
                type="text"
                className="w-[30%] h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
              />
            </div>
          </div>
          <h3 className="text-lg font-[500] mb-2">Category Image</h3>
          <div className="grid grid-cols-7 gap-4">
            <div className="uploadImageWrapper relative">
              <span className="cursor-pointer">
                <IoClose className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-2xl z-20" />
              </span>
              <div className="uploadbox w-full rounded-md overflow-hidden border border-dashed border-black/30 h-[150px] bg-gray-100 hover:bg-gray-200 text-gray-500 relative">
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  alt={"image"}
                  src={
                    "https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
                  }
                />
              </div>
            </div>
            <UploadBox multiple={true} />
          </div>
        </div>
        <Button type="button" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddCategory;
