import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import CircularProgress from "@mui/material/CircularProgress";
import {
  setProData,
  setProdRam,
  setProdSize,
  setProdWeight,
} from "../../redux/slices/productsDataSlice";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const prodRam = useSelector((state) => state.proData.prodRam);
  const prodSize = useSelector((state) => state.proData.prodSize);
  const prodWgt = useSelector((state) => state.proData.prodWeight);
  const [selectedCatObject, setSelectedCatObject] = useState(null);
  const [selectedSubCatObject, setSelectedSubCatObject] = useState(null);
  const catData = useSelector((state) => state.catData.catData);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    bannerImages: [],
    bannerTitleName: "",
    isDisplayOnHomeBanner: false,
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdSubCatId: "",
    thirdSubCat: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });
  const [proCat, setProCat] = React.useState("");
  const [proSubCat, setProSubCat] = React.useState("");
  const [proTSubCat, setTProSubCat] = React.useState("");
  const [checkedSwitch, setCheckedSwitch] = React.useState(false);

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
  const setBannerImagesFun = (previewArr) => {
    const imgArr = bannerPreviews;
    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }
    setBannerPreviews(imgArr);
    setFormFields((fields) => {
      return {
        ...fields,
        bannerImages: imgArr,
      };
    });
  };

  const removeImg = async (img, idx) => {
    setIsLoading(true);
    setDisable(true);
    try {
      await deleteImages(`/api/product/deleteImage?img=${img}`, {
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

  const removeImg2 = async (img, idx) => {
    setIsLoading(true);
    setDisable(true);
    try {
      await deleteImages(`/api/product/deleteImage?img=${img}`, {
        credentials: true,
      });

      setBannerPreviews((prev) => {
        const updated = [...prev];
        updated.splice(idx, 1);

        setFormFields((fields) => {
          return {
            ...fields,
            bannerImages: updated,
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

  const handleChangeProCat = (event) => {
    const selectedCatId = event.target.value;
    setProCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      catId: event.target.value,
      category: event.target.value,
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

  const selectCatByName = (name) => {
    setFormFields((fields) => ({ ...fields, catName: name }));
  };

  const selectSubCatByName = (name) => {
    setFormFields((fields) => ({ ...fields, subCat: name }));
  };

  const selectThirdSubCatByName = (name) => {
    setFormFields((fields) => ({ ...fields, thirdSubCat: name }));
  };

  const [isFeatured, setIsFeatured] = React.useState(false);
  const handleChangeIsFeatured = (event) => {
    setIsFeatured(event.target.value);
    setFormFields((fields) => ({ ...fields, isFeatured: event.target.value }));
  };

  const [proRam, setProRam] = React.useState([]);
  const handleChangeProRam = (event) => {
    const { value } = event.target;
    const newRams = typeof value === "string" ? value.split(",") : value;
    setProRam(newRams);
    setFormFields((fields) => ({ ...fields, productRam: newRams }));
  };

  const [proWeight, setProWeight] = React.useState([]);
  const handleChangeProWeight = (event) => {
    const { value } = event.target;
    const newWeights = typeof value === "string" ? value.split(",") : value;
    setProWeight(newWeights);
    setFormFields((fields) => ({ ...fields, productWeight: newWeights }));
  };

  const [proSize, setProSize] = React.useState([]);
  const handleChangeProSize = (event) => {
    const { value } = event.target;
    const newSizes = typeof value === "string" ? value.split(",") : value;
    setProSize(newSizes);
    setFormFields((fields) => ({ ...fields, size: newSizes }));
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
  const handleChangeSwitch = (e) => {
    setCheckedSwitch(e.target.checked);
    setFormFields((prev) => ({
      ...prev,
      isDisplayOnHomeBanner: e.target.checked,
    }));
  };

  
  const onChangeRating = (e) => {
    setFormFields((fields) => ({
      ...fields,
      rating: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      toast.error("please add product name");
      setIsLoading(false);
      return false;
    }
    // ... (your other validation checks)
    if (formFields.description === "") {
      toast.error("please add product description");
      setIsLoading(false);
      return false;
    }
    if (formFields.catName === "") {
      toast.error("please add product category name");
      setIsLoading(false);
      return false;
    }
    if (formFields.subCat === "") {
      toast.error("please add sub category name");
      setIsLoading(false);
      return false;
    }
    if (formFields.thirdSubCat === "") {
      toast.error("please add third sub category name");
      setIsLoading(false);
      return false;
    }
    if (formFields.price === "") {
      toast.error("please add product price");
      setIsLoading(false);
      return false;
    }
    if (formFields.oldPrice === "") {
      toast.error("please add product old price");
      setIsLoading(false);
      return false;
    }
    if (formFields.countInStock === "") {
      toast.error("please add product stock");
      setIsLoading(false);
      return false;
    }
    if (formFields.brand === "") {
      toast.error("please add product brand");
      setIsLoading(false);
      return false;
    }
    if (formFields.discount === "") {
      toast.error("please add product discount");
      setIsLoading(false);
      return false;
    }
    if (
      formFields.productRam.length === 0 &&
      formFields.size.length === 0 &&
      formFields.productWeight.length === 0
    ) {
      toast.error("please add product Ram or size or weight");
      setIsLoading(false);
      return false;
    }
    if (formFields.rating === "") {
      toast.error("please add product rating");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      toast.error("please add product images");
      setIsLoading(false);
      return false;
    }

    const finalFormFields = {
      ...formFields,
      images: previews,
      bannerImages: bannerPreviews,
    };

    postData("/api/product/create", finalFormFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res.message);
          setIsLoading(false);
          fetchDataFromApi("/api/product").then((res) => {
            dispatch(setProData(res?.data));
          });
          navigate("/products");
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

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/api/product/rams/get"),
      fetchDataFromApi("/api/product/size/get"),
      fetchDataFromApi("/api/product/weight/get"),
      fetchDataFromApi("/api/category"),
    ])
      .then(([ramRes, sizeRes, wgtRes, categoriesRes]) => {
        if (!ramRes?.error) {
          dispatch(setProdRam(ramRes?.data));
        } else {
          toast.error("Failed to fetch product rams.");
        }
        if (!sizeRes?.error) {
          dispatch(setProdSize(sizeRes?.data));
        } else {
          toast.error("Failed to fetch product sizes.");
        }
        if (!wgtRes?.error) {
          dispatch(setProdWeight(wgtRes?.data));
        } else {
          toast.error("Failed to fetch product weights.");
        }
        if (!categoriesRes?.error) {
          dispatch(setCatData(categoriesRes?.data));
        } else {
          toast.error("Failed to fetch categories.");
        }
      })
      .catch((error) => {
        toast.error(`Initial data fetch error: ${error.message}`);
      });
  }, [isOpenFullScreenPanel]);

  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Description</h3>
              <textarea
                type="text"
                className="w-full !h-32 border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-10 gap-4">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Category</h3>
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
                      <MenuItem
                        onClick={() => selectCatByName(cat?.name)}
                        key={cat?.name}
                        value={cat?._id}
                      >
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Sub Category</h3>
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
                        <MenuItem
                          onClick={() => selectSubCatByName(subCat?.name)}
                          key={subCat?.name}
                          value={subCat?._id}
                        >
                          {subCat?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">
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
                          onClick={() =>
                            selectThirdSubCatByName(thirdSubCat?.name)
                          }
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
              <h3 className="text-lg font-[500] mb-3">Product Price</h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Price"
                variant="outlined"
                className="w-full"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
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
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
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
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
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
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
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
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
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
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
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
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proRam-label"
                    size="medium"
                    id="proRam"
                    value={proRam}
                    label="Select RAM"
                    onChange={handleChangeProRam}
                  >
                    {prodRam?.length !== 0 &&
                      prodRam?.map((ram) => (
                        <MenuItem key={ram.ram} value={ram.ram}>
                          {ram.ram}
                        </MenuItem>
                      ))}
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
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proWeight-label"
                    size="medium"
                    id="proWeight"
                    value={proWeight}
                    label="Select Weight"
                    onChange={handleChangeProWeight}
                  >
                    {prodWgt?.length !== 0 &&
                      prodWgt?.map((wgt) => (
                        <MenuItem key={wgt.wgt} value={wgt.wgt}>
                          {wgt.wgt}
                        </MenuItem>
                      ))}
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
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proSize-label"
                    size="medium"
                    id="proSize"
                    value={proSize}
                    label="Select Size"
                    onChange={handleChangeProSize}
                  >
                    {prodSize?.length !== 0 &&
                      prodSize?.map((size) => (
                        <MenuItem key={size.size} value={size.size}>
                          {size.size}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Rating</h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>
          <div className="col w-full p-5 px-0">
            <h3 className="font-bold text-lg mb-3">Media & Images</h3>
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
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setCatPreviews={setCatPreviews}
                disable={disable}
                setDisable={setDisable}
              />
            </div>
          </div>
          <div className="col w-full p-5 px-0">
            <div className="shadow-md bg-white p-4 w-full relative">
              <Switch
                onChange={handleChangeSwitch}
                checked={checkedSwitch}
                className="!absolute right-5"
                {...label}
              />
              <h3 className="font-bold text-lg mb-3">Banner Images</h3>
              <div className="grid grid-cols-7 gap-4">
                {bannerPreviews?.length !== 0 &&
                  bannerPreviews?.map((image, index) => (
                    <div key={image} className="uploadImageWrapper relative">
                      <span
                        className="cursor-pointer"
                        onClick={() => removeImg2(image, index)}
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
                  name="bannerImages"
                  url="/api/product/uploadBannerImages"
                  setCatPreviews={setBannerImagesFun}
                  disable={disable}
                  setDisable={setDisable}
                />
              </div>
              <h3 className="font-bold text-lg mb-3 mt-5">Banner Title</h3>
              <input
                type="text"
                className="w-1/2 h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                name="bannerTitleName"
                value={formFields.bannerTitleName}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>
        <hr />
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

export default AddProduct;
