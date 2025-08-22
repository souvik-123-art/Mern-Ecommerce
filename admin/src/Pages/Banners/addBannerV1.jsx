import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { setBannerV1 } from "../../redux/slices/HomeBannerSlice";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import { useEffect } from "react";

const AddBannerV1 = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.catData.catData);
  const [disable, setDisable] = useState(false);
  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    subCatId: "",
    thirdSubCatId: "",
    price: "",
    images: [],
    align: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [proCat, setProCat] = useState("");
  const [proSubCat, setProSubCat] = useState("");
  const [proTSubCat, setTProSubCat] = useState("");
  const [selectedCatObject, setSelectedCatObject] = useState(null);
  const [selectedSubCatObject, setSelectedSubCatObject] = useState(null);
  const [previews, setPreviews] = useState([]);
  const handleChangeProCat = (event) => {
    const selectedCatId = event.target.value;
    setProCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      catId: event.target.value,
    }));
    const foundCat = catData.find((cat) => cat._id === selectedCatId);
    setSelectedCatObject(foundCat);
  };
  const handleChangeProSubCat = (event) => {
    const selectedSubCatId = event.target.value;
    setProSubCat(event.target.value);
    setFormFields((fields) => ({ ...fields, subCatId: event.target.value }));
    const foundCat = selectedCatObject?.children?.find(
      (subCat) => subCat._id === selectedSubCatId
    );
    setSelectedSubCatObject(foundCat);
  };

  const handleChangeProTSubCat = (event) => {
    setTProSubCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      thirdSubCatId: event.target.value,
    }));
  };
  const setCatPreviews = (previewArr) => {
    const imgArr = previews;
    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }
    setPreviews(imgArr);
    setFormFields((fields) => {
      return {
        ...fields,
        images: imgArr,
      };
    });
  };
  const removeImg = async (img, idx) => {
    setIsLoading(true);
    setDisable(true);
    try {
      await deleteImages(`/api/bannerV1/deleteImage?img=${img}`, {
        credentials: true,
      });

      setPreviews((prev) => {
        const updated = [...prev];
        updated.splice(idx, 1);

        setFormFields((fields) => {
          return {
            ...fields,
            images: updated,
          };
        });

        return updated;
      });
    } catch (error) {
      toast.error("Failed to remove image");
      console.error("Error removing image:", error);
    } finally {
      setDisable(false);
      setIsLoading(false);
    }
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((fields) => {
      return {
        ...fields,
        [name]: value,
      };
    });
  };
  const handleChangeAlign = (e) => {
    setFormFields((prev) => ({
      ...prev,
      align: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.bannerTitle === "") {
      toast.error("please add banner title");
      setIsLoading(false);
      return false;
    }
    // ... (your other validation checks)
    if (formFields.price === "") {
      toast.error("please add price");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      toast.error("please add banner image");
      setIsLoading(false);
      return false;
    }
    postData("/api/bannerV1/add", formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res.message);
          setIsLoading(false);
          fetchDataFromApi("/api/bannerV1").then((res) => {
            dispatch(setBannerV1(res?.data));
          });
          navigate("/bannerV1List");
          dispatch(setIsOpenFullScreenPanel({ open: false }));
        } else {
          toast.error(res.message);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <section className="p-5 bg-gray-50 h-screen relative">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-5 mb-5 gap-4">
            <div className="col-span-1 mb-3">
              <h3 className="text-lg font-[500] mb-2">Banner Title</h3>
              <input
                type="text"
                name="bannerTitle"
                value={formFields.bannerTitle}
                onChange={onChangeInput}
                className="h-[55px] w-full border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
              />
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-2">Banner Category</h3>
              {catData?.length !== 0 && (
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
                    {catData?.map((cat) => (
                      <MenuItem key={cat?.name} value={cat?._id}>
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-2">Product Sub Category</h3>
              <div>
                {selectedCatObject?.children?.length !== 0 && (
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
                      {selectedCatObject?.children?.map((subCat) => (
                        <MenuItem key={subCat?.name} value={subCat?._id}>
                          {subCat?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-2">
                Product Third Level Sub Category
              </h3>
              <div>
                {selectedSubCatObject?.children !== 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="proTSubCat-label">
                      Select Third Level Sub Category
                    </InputLabel>
                    <Select
                      className="focus:!outline-black/50"
                      labelId="proTSubCat-label"
                      size="medium"
                      id="proTSubCat"
                      value={proTSubCat}
                      label="Select Third Level Sub Category"
                      onChange={handleChangeProTSubCat}
                    >
                      {selectedSubCatObject?.children?.map((thirdSubCat) => (
                        <MenuItem
                          key={thirdSubCat?.name}
                          value={thirdSubCat?._id}
                        >
                          {thirdSubCat?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-2">Banner Text Align</h3>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="align-label">Select Align</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="align-label"
                    size="medium"
                    id="align"
                    value={formFields.align || ""}
                    label="Select Align"
                    onChange={handleChangeAlign}
                  >
                    <MenuItem value={"left"}>Left</MenuItem>
                    <MenuItem value={"right"}>Right</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1 mb-3">
              <h3 className="text-lg font-[500] mb-2">Price</h3>
              <input
                type="number"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
                className="h-[55px] w-full border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
              />
            </div>
          </div>
          <h3 className="text-lg font-[500] mb-2">Banner Image</h3>
          <div className="grid grid-cols-7 gap-4">
            {previews?.length !== 0 &&
              previews?.map((image, index) => (
                <div key={image} className="uploadImageWrapper relative">
                  <span
                    className="cursor-pointer"
                    onClick={() => removeImg(image, index)}
                  >
                    <IoClose className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-2xl z-20" />
                  </span>

                  <div className="lazyload w-full rounded-md overflow-hidden border border-dashed border-black/30 h-[150px] bg-gray-100 hover:bg-gray-200 text-gray-500 relative">
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      effect="blur"
                      wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: { transitionDelay: "1s" },
                      }}
                      alt={"image"}
                      src={image}
                    />
                  </div>
                </div>
              ))}

            <UploadBox
              multiple={false}
              name="images"
              url="/api/bannerV1/uploadImages"
              setCatPreviews={setCatPreviews}
              disable={disable}
              setDisable={setDisable}
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

export default AddBannerV1;
