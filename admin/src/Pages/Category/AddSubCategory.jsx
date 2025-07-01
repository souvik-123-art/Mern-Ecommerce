import React from "react";
import UploadBox from "../../Components/UploadBox";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const AddSubCategory = () => {
  const [parentCat, setParentCat] = React.useState("");

  const handleChangeParentCat = (event) => {
    setParentCat(event.target.value);
  };
  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3">
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="col mb-5">
            <h3 className="text-lg font-[500] mb-3">Parent Category</h3>
            <div>
              <FormControl className="w-[25%]">
                <InputLabel id="parentCat-label">
                  Select Parent Category
                </InputLabel>
                <Select
                  className="focus:!outline-black/50"
                  labelId="parentCat-label"
                  size="medium"
                  id="parentCat"
                  value={parentCat}
                  label="Select Parent Category"
                  onChange={handleChangeParentCat}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={10}>Fashion</MenuItem>
                  <MenuItem value={20}>Beauty</MenuItem>
                  <MenuItem value={30}>Wellness</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col">
            <h3 className="text-lg font-[500] mb-3">Add Sub Category</h3>
            <input
              type="text"
              className="w-[30%] h-[50px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
            />
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

export default AddSubCategory;
