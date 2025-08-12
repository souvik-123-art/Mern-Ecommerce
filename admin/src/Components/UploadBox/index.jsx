import React from "react";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa6";
import { uploadImage } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  let selectedImages = [];
  const formData = new FormData();
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);

          formData.append(props?.name, file);
        } else {
          toast.error("please upload JPG, PNG or WEBP image");
          setUploading(false);
          return false;
        }
      }
      uploadImage(apiEndPoint, formData).then((res) => {
        setUploading(false);
        if (props?.multiple === true) {
          props.setDisable(false);
        } else {
          props.setDisable(true);
        }
        props.setCatPreviews(res?.data?.images);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="uploadbox p-2 rounded-md overflow-hidden border border-dashed border-black/30 h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center flex-col gap-2 justify-center text-gray-500 relative">
        <FaRegImages className="text-5xl cursor-pointer" />
        <h4 className="text-md font-semibold cursor-pointer">Image Upload</h4>
        <input
          disabled={props.disable}
          type="file"
          accept="image/*"
          name={props?.name}
          onChange={(e) => onChangeFile(e, props?.url)}
          multiple={props.multiple !== undefined ? props.multiple : false}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <div
        className={`absolute inset-0 bg-black/40 ${
          uploading ? "flex" : "hidden"
        } justify-center items-center z-50 left-0 top-0`}
      >
        <CircularProgress className="!text-white" />
      </div>
    </>
  );
};

export default UploadBox;
