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
import { fetchDataFromApi, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { setCatData } from "../../redux/slices/categoryDataSlice";
const AddSubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            fetchDataFromApi("/api/category").then((res) => {
              dispatch(setCatData(res?.data));
            });
            navigate("/subCategory/list");
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
            fetchDataFromApi("/api/category").then((res) => {
              dispatch(setCatData(res?.data));
            });
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
    <section className="p-5 bg-gray-50 min-h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Add Sub Category Form */}
      <form
        className="form p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h4 className="font-bold text-xl text-primary mb-4">
          Add Sub Category
        </h4>

        <div className="scroll max-h-[60vh] overflow-y-auto pr-4 pt-2 space-y-5">
          <div>
            <h3 className="text-lg font-[500] mb-2">Parent Category</h3>
            <FormControl fullWidth className="max-w-xs">
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
                      key={item._id}
                      onClick={() => selectedCatFun(item.name)}
                      value={item._id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <h3 className="text-lg font-[500] mb-2">Sub Category Name</h3>
            <input
              type="text"
              name="name"
              onChange={onChangeInput}
              value={formFields.name}
              className="w-full max-w-xs h-[50px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
            />
          </div>
        </div>

        <Button type="submit" className="!p-3 btn-blue w-full mt-6">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>

      {/* Add Third Sub Category Form */}
      <form
        className="form p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit2}
      >
        <h4 className="font-bold text-xl text-primary mb-4">
          Add Third Sub Category
        </h4>

        <div className="scroll max-h-[60vh] overflow-y-auto pr-4 pt-2 space-y-5">
          <div>
            <h3 className="text-lg font-[500] mb-2">Parent Sub Category</h3>
            <FormControl fullWidth className="max-w-xs">
              <InputLabel id="parentCat2-label">
                Select Parent Sub Category
              </InputLabel>
              <Select
                className="focus:!outline-black/50"
                labelId="parentCat2-label"
                size="medium"
                id="parentCat2"
                value={parentCat2}
                label="Select Parent Sub Category"
                onChange={handleChangeParentCat2}
              >
                {catData?.length !== 0 &&
                  catData.map(
                    (item) =>
                      item?.children.length !== 0 &&
                      item?.children.map((item2) => (
                        <MenuItem
                          key={item2._id}
                          onClick={() => selectedCatFun2(item2.name)}
                          value={item2._id}
                        >
                          {item2.name}
                        </MenuItem>
                      ))
                  )}
              </Select>
            </FormControl>
          </div>

          <div>
            <h3 className="text-lg font-[500] mb-2">Third Sub Category Name</h3>
            <input
              type="text"
              name="name"
              onChange={onChangeInput2}
              value={formFields2.name}
              className="w-full max-w-xs h-[50px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
            />
          </div>
        </div>

        <Button type="submit" className="!p-3 btn-blue w-full mt-6">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>

      {/* Loading Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 ${
          isLoading ? "flex" : "hidden"
        } justify-center items-center z-50`}
      >
        <CircularProgress className="!text-white" />
      </div>
    </section>
  );
};

export default AddSubCategory;
