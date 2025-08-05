import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import CircularProgress from "@mui/material/CircularProgress";
const AddSubCategory = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [parentCat, setParentCat] = useState("");
  const [parentCat2, setParentCat2] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const catData = useSelector((state) => state.catData.catData);
  const handleChangeParentCat = (event) => {
    setParentCat(event.target.value);
    formFields.parentId = event.target.value;
  };
  const handleChangeParentCat2 = (event) => {
    setParentCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };
  const selectedCatFun = (catName) => {
    formFields.parentCatName = catName;
  };
  const selectedCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("please add sub category name");
      setIsLoading(false);
      return false;
    }
    if (parentCat === "") {
      toast.error("please select parent category");
      setIsLoading(false);
      return false;
    }
    postData("/api/category/create", formFields, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            toast.success(res.message);
            setIsLoading(false);
            dispatch(setIsOpenFullScreenPanel({ open: false }));
          } else {
            toast.error(res.message);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error);
          setIsLoading(false);
        }
      }
    );
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields2.name === "") {
      toast.error("please add third sub category name");
      setIsLoading(false);
      return false;
    }
    if (parentCat2 === "") {
      toast.error("please select parent sub category");
      setIsLoading(false);
      return false;
    }
    postData("/api/category/create", formFields2, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            toast.success(res.message);
            setIsLoading(false);
            dispatch(setIsOpenFullScreenPanel({ open: false }));
          } else {
            toast.error(res.message);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error);
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <section className="p-5 bg-gray-50 h-[100vh] grid grid-cols-1 md:grid-cols-2">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <h4 className="font-bold text-xl text-primary">Add Sub Category</h4>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="col mb-5">
            <h3 className="text-lg font-[500] mb-3">Parent Category</h3>
            <div>
              <FormControl className="w-[35%]">
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
                  {catData?.length !== 0 &&
                    catData.map((item) => (
                      <MenuItem
                        key={item.name}
                        onClick={() => selectedCatFun(item.name)}
                        value={item?._id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col">
            <h3 className="text-lg font-[500] mb-3">Add Sub Category</h3>
            <input
              type="text"
              name="name"
              onChange={onChangeInput}
              value={formFields.name}
              className="w-[30%] h-[50px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
            />
          </div>
        </div>
        <Button type="submit" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
      <form className="form p-8 py-3" onSubmit={handleSubmit2}>
        <h4 className="font-bold text-xl text-primary">
          Add Third Sub Category
        </h4>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="col mb-5">
            <h3 className="text-lg font-[500] mb-3">Parent Sub Category</h3>
            <div>
              <FormControl className="w-[35%]">
                <InputLabel id="parentCat-label">
                  Select Parent Sub Category
                </InputLabel>
                <Select
                  className="focus:!outline-black/50"
                  labelId="parentCat-label"
                  size="medium"
                  id="parentCat"
                  value={parentCat2}
                  label="Select Parent Category"
                  onChange={handleChangeParentCat2}
                >
                  {catData?.length !== 0 &&
                    catData.map(
                      (item) =>
                        item?.children.length !== 0 &&
                        item?.children.map((item2) => (
                          <MenuItem
                            key={item2.name}
                            onClick={() => selectedCatFun2(item2.name)}
                            value={item2?._id}
                          >
                            {item2.name}
                          </MenuItem>
                        ))
                    )}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col">
            <h3 className="text-lg font-[500] mb-3">Add Third Sub Category</h3>
            <input
              type="text"
              name="name"
              onChange={onChangeInput2}
              value={formFields2.name}
              className="w-[30%] h-[50px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
            />
          </div>
        </div>
        <Button type="submit" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
      <div
        className={`absolute inset-0 bg-black/40 ${
          isLoading ? "flex" : "hidden"
        } justify-center items-center z-50 left-0 top-0`}
      >
        <CircularProgress className="!text-white" />
      </div>
    </section>
  );
};

export default AddSubCategory;
