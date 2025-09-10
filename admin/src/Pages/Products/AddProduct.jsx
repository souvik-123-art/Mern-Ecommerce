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
    // if (formFields.thirdSubCat === "") {
    //   toast.error("please add third sub category name");
    //   setIsLoading(false);
    //   return false;
    // }
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
    <section className="p-5 bg-gray-50 min-h-screen">
      <form
        className="form p-5 sm:p-8 py-3 bg-white rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        {/* Scroll wrapper */}
        <div className="scroll max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
          {/* Product Name */}
          <div className="mb-3">
            <h3 className="text-lg font-medium mb-1">Product Name</h3>
            <input
              type="text"
              className="w-full h-[40px] border border-black/30 focus:outline-none focus:border-black/50 rounded-md p-3 text-sm"
              name="name"
              value={formFields.name}
              onChange={onChangeInput}
            />
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <h3 className="text-lg font-medium mb-1">Product Description</h3>
            <textarea
              className="w-full h-32 border border-black/30 focus:outline-none focus:border-black/50 rounded-md p-3 text-sm"
              name="description"
              value={formFields.description}
              onChange={onChangeInput}
            />
          </div>

          {/* Category + Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Category */}
            <div>
              <h3 className="text-lg font-medium mb-2">Product Category</h3>
              {catData?.length !== 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proCat-label">Select Category</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proCat-label"
                    id="proCat"
                    value={proCat}
                    label="Select Category"
                    onChange={handleChangeProCat}
                  >
                    {catData?.map((cat) => (
                      <MenuItem
                        key={cat?._id}
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            {/* Sub Category */}
            <div>
              <h3 className="text-lg font-medium mb-2">Product Sub Category</h3>
              {selectedCatObject?.children?.length > 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proSubCat-label">
                    Select Sub Category
                  </InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proSubCat-label"
                    id="proSubCat"
                    value={proSubCat}
                    label="Select Sub Category"
                    onChange={handleChangeProSubCat}
                  >
                    {selectedCatObject?.children?.map((subCat) => (
                      <MenuItem
                        key={subCat?._id}
                        value={subCat?._id}
                        onClick={() => selectSubCatByName(subCat?.name)}
                      >
                        {subCat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            {/* Third Level Category */}
            <div>
              <h3 className="text-lg font-medium mb-2">
                Third Level Sub Category
              </h3>
              {selectedSubCatObject?.children?.length > 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proTSubCat-label">
                    Select Third Level
                  </InputLabel>
                  <Select
                    className="focus:!outline-black/50"
                    labelId="proTSubCat-label"
                    id="proTSubCat"
                    value={proTSubCat}
                    label="Select Third Level"
                    onChange={handleChangeProTSubCat}
                  >
                    {selectedSubCatObject?.children?.map((thirdSubCat) => (
                      <MenuItem
                        key={thirdSubCat?._id}
                        value={thirdSubCat?._id}
                        onClick={() =>
                          selectThirdSubCatByName(thirdSubCat?.name)
                        }
                      >
                        {thirdSubCat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            {/* Price */}
            <div>
              <h3 className="text-lg font-medium mb-2">Product Price</h3>
              <TextField
                type="number"
                label="Enter Price"
                variant="outlined"
                className="w-full"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            {/* Old Price */}
            <div>
              <h3 className="text-lg font-medium mb-2">Old Price</h3>
              <TextField
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

          {/* Stock, Brand, Discount, Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Featured */}
            <div>
              <h3 className="text-lg font-medium mb-2">Is Featured?</h3>
              <FormControl fullWidth size="small">
                <InputLabel id="isFeatured-label">Select</InputLabel>
                <Select
                  labelId="isFeatured-label"
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

            {/* Stock */}
            <div>
              <h3 className="text-lg font-medium mb-2">Stock</h3>
              <TextField
                type="number"
                label="Enter Stock"
                variant="outlined"
                className="w-full"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            {/* Brand */}
            <div>
              <h3 className="text-lg font-medium mb-2">Brand</h3>
              <TextField
                type="text"
                label="Brand"
                variant="outlined"
                className="w-full"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>

            {/* Discount */}
            <div>
              <h3 className="text-lg font-medium mb-2">Discount</h3>
              <TextField
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

          {/* RAM, Weight, Size, Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* RAM */}
            <div>
              <h3 className="text-lg font-medium mb-2">RAM</h3>
              <FormControl fullWidth size="small">
                <InputLabel id="proRam-label">Select RAM</InputLabel>
                <Select
                  multiple
                  labelId="proRam-label"
                  id="proRam"
                  value={proRam}
                  onChange={handleChangeProRam}
                >
                  {prodRam?.map((ram) => (
                    <MenuItem key={ram.ram} value={ram.ram}>
                      {ram.ram}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Weight */}
            <div>
              <h3 className="text-lg font-medium mb-2">Weight</h3>
              <FormControl fullWidth size="small">
                <InputLabel id="proWeight-label">Select Weight</InputLabel>
                <Select
                  multiple
                  labelId="proWeight-label"
                  id="proWeight"
                  value={proWeight}
                  onChange={handleChangeProWeight}
                >
                  {prodWgt?.map((wgt) => (
                    <MenuItem key={wgt.wgt} value={wgt.wgt}>
                      {wgt.wgt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-lg font-medium mb-2">Size</h3>
              <FormControl fullWidth size="small">
                <InputLabel id="proSize-label">Select Size</InputLabel>
                <Select
                  multiple
                  labelId="proSize-label"
                  id="proSize"
                  value={proSize}
                  onChange={handleChangeProSize}
                >
                  {prodSize?.map((size) => (
                    <MenuItem key={size.size} value={size.size}>
                      {size.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-medium mb-2">Rating</h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          {/* Media & Images */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Media & Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {previews?.map((image, index) => (
                <div key={image} className="relative">
                  <IoClose
                    className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-2xl cursor-pointer z-20"
                    onClick={() => removeImg(image, index)}
                  />
                  <LazyLoadImage
                    className="w-full h-[150px] object-cover rounded-md border border-dashed border-black/30"
                    effect="blur"
                    src={image}
                    alt="image"
                  />
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

          {/* Banner Section */}
          <div className="mb-6">
            <div className="shadow-md bg-white p-4 rounded-lg relative">
              <Switch
                onChange={handleChangeSwitch}
                checked={checkedSwitch}
                className="!absolute right-5 top-5"
                {...label}
              />
              <h3 className="font-bold text-lg mb-3">Banner Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {bannerPreviews?.map((image, index) => (
                  <div key={image} className="relative">
                    <IoClose
                      className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-2xl cursor-pointer z-20"
                      onClick={() => removeImg2(image, index)}
                    />
                    <LazyLoadImage
                      className="w-full h-[150px] object-cover rounded-md border border-dashed border-black/30"
                      effect="blur"
                      src={image}
                      alt="image"
                    />
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
              <h3 className="font-bold text-lg mt-5 mb-2">Banner Title</h3>
              <input
                type="text"
                className="w-full sm:w-1/2 h-[40px] border border-black/30 rounded-md p-3 text-sm focus:outline-none focus:border-black/50"
                name="bannerTitleName"
                value={formFields.bannerTitleName}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-6 p-3 btn-blue flex items-center justify-center gap-2"
        >
          <BsCloudUpload className="text-xl" /> Publish & View
        </Button>
      </form>

      {/* Loader */}
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

export default AddProduct;
