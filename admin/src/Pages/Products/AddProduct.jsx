import React from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { BsCloudUpload } from "react-icons/bs";
const AddProduct = () => {
  const [proCat, setProCat] = React.useState("");

  const handleChangeProCat = (event) => {
    setProCat(event.target.value);
  };
  const [proSubCat, setProSubCat] = React.useState("");

  const handleChangeProSubCat = (event) => {
    setProSubCat(event.target.value);
  };
  const [isFeatured, setIsFeatured] = React.useState("");

  const handleChangeIsFeatured = (event) => {
    setIsFeatured(event.target.value);
  };
  const [proRam, setProRam] = React.useState("");

  const handleChangeProRam = (event) => {
    setProRam(event.target.value);
  };
  const [proWeight, setProWeight] = React.useState("");

  const handleChangeProWeight = (event) => {
    setProWeight(event.target.value);
  };
  const [proSize, setProSize] = React.useState("");

  const handleChangeProSize = (event) => {
    setProSize(event.target.value);
  };
  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3">
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Description</h3>
              <textarea
                type="text"
                className="w-full !h-32 border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-4 mb-10 gap-4">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Category</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="proCat-label">Select Category</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proCat-label"
                    size="medium"
                    id="proCat"
                    value={proCat}
                    label="Select Category"
                    onChange={handleChangeProCat}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={10}>Fashion</MenuItem>
                    <MenuItem value={20}>Beauty</MenuItem>
                    <MenuItem value={30}>Wellness</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Sub Category</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="proSubCat-label">
                    Select Sub Category
                  </InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proSubCat-label"
                    size="medium"
                    id="proSubCat"
                    value={proSubCat}
                    label="Select Sub Category"
                    onChange={handleChangeProSubCat}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={10}>Men</MenuItem>
                    <MenuItem value={20}>Women</MenuItem>
                    <MenuItem value={30}>Kids</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Price</h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Price"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Old Price</h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Old Price"
                variant="outlined"
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Is Featured ?</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="isFeatured-label">Select Featured</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="isFeatured-label"
                    size="medium"
                    id="isFeatured"
                    value={isFeatured}
                    label="Select Featured"
                    onChange={handleChangeIsFeatured}
                  >
                    <MenuItem value={10}>True</MenuItem>
                    <MenuItem value={20}>False</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Stock</h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Stock"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Brand</h3>
              <TextField
                id="outlined-basic"
                type="text"
                label="Brand"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Discount</h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Discount"
                variant="outlined"
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product RAMS</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="proRam-label">Select RAM</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proRam-label"
                    size="medium"
                    id="proRam"
                    value={proRam}
                    label="Select RAM"
                    onChange={handleChangeProRam}
                  >
                    <MenuItem value={"4GB"}>4GB</MenuItem>
                    <MenuItem value={"6GB"}>6GB</MenuItem>
                    <MenuItem value={"8GB"}>8GB</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Weight</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="proWeight-label">Select Weight</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proWeight-label"
                    size="medium"
                    id="proWeight"
                    value={proWeight}
                    label="Select Weight"
                    onChange={handleChangeProWeight}
                  >
                    <MenuItem value={""}>none</MenuItem>
                    <MenuItem value={10}>2KG</MenuItem>
                    <MenuItem value={20}>4KG</MenuItem>
                    <MenuItem value={30}>5KG</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Size</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="proSize-label">Select Size</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proSize-label"
                    size="medium"
                    id="proSize"
                    value={proSize}
                    label="Select Size"
                    onChange={handleChangeProSize}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                    <MenuItem value={"XXL"}>XXL</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Rating</h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>
          <div className="col w-full p-5 px-0">
            <h3 className="font-bold text-lg mb-3">Media & Images</h3>
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
        </div>
        <hr />
        <Button type="button" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl"/>
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
