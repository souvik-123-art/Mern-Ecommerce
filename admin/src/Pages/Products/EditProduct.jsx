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
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
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
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const prodRam = useSelector((state) => state.proData.prodRam);
  const prodSize = useSelector((state) => state.proData.prodSize);
  const prodWgt = useSelector((state) => state.proData.prodWeight);
  const [selectedCatObject, setSelectedCatObject] = useState(null);
  const [selectedSubCatObject, setSelectedSubCatObject] = useState(null);
  const id = isOpenFullScreenPanel.id;
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [checkedSwitch, setCheckedSwitch] = React.useState(false);
  const catData = useSelector((state) => state.catData.catData);
  useEffect(() => {
    fetchDataFromApi(`/api/product/get/${id}`).then((res) => {
      const product = res?.product;
      setFormFields({
        name: res?.product?.name,
        description: res?.product?.description,
        images: res?.product?.images,
        bannerImages: res?.product?.bannerImages,
        bannerTitleName: res?.product?.bannerTitleName,
        isDisplayOnHomeBanner: res?.product?.isDisplayOnHomeBanner,
        brand: res?.product?.brand,
        price: res?.product?.price,
        oldPrice: res?.product?.oldPrice,
        catName: res?.product?.catName,
        category: res?.product?.category,
        catId: res?.product?.catId,
        subCatId: res?.product?.subCatId,
        subCat: res?.product?.subCat,
        thirdSubCatId: res?.product?.thirdSubCatId,
        thirdSubCat: res?.product?.thirdSubCat,
        countInStock: res?.product?.countInStock,
        rating: res?.product?.rating,
        discount: res?.product?.discount,
        isFeatured: res?.product?.isFeatured,
        productRam: res?.product?.productRam || [],
        size: res?.product?.size || [],
        productWeight: res?.product?.productWeight || [],
      });
      setProCat(res?.product?.catId);
      setProSubCat(res?.product?.subCatId);
      setTProSubCat(res?.product?.thirdSubCatId);
      setIsFeatured(res?.product?.isFeatured);
      setProRam(res?.product?.productRam || []);
      setProSize(res?.product?.size || []);
      setProWeight(res?.product?.productWeight || []);
      setPreviews(res?.product?.images);
      setBannerPreviews(res?.product?.bannerImages);
      setCheckedSwitch(res?.product?.isDisplayOnHomeBanner);
      initializeCategoryStates(product);
      if (bannerPreviews?.length !== 0) {
        setDisable2(false);
      } else {
        setDisable2(true);
      }
    });
  }, [id, catData]);
  const initializeCategoryStates = (productData) => {
    if (catData?.length > 0 && productData) {
      const selectedCat = catData.find((cat) => cat._id === productData.catId);
      if (selectedCat) {
        setSelectedCatObject(selectedCat);
        const selectedSubCat = selectedCat.children?.find(
          (subCat) => subCat._id === productData.subCatId
        );
        if (selectedSubCat) {
          setSelectedSubCatObject(selectedSubCat);
        }
      }
    }
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
  const removeImg = (img, idx) => {
    setIsLoading(true);
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/product/deleteImage?img=${img}`, {
      credentials: true,
    }).then((res) => {
      imageArr.splice(idx, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        setFormFields((prev) => ({ ...prev, images: imageArr }));
      }, 100);
      setDisable(false);
      setIsLoading(false);
    });
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
  const [proCat, setProCat] = React.useState("");
  const [proSubCat, setProSubCat] = React.useState("");
  const [proTSubCat, setTProSubCat] = React.useState("");
  const handleChangeProCat = (event) => {
    const selectedCatId = event.target.value;
    setProCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      catId: selectedCatId,
      subCatId: "",
      thirdSubCatId: "",
    }));
    const foundCat = catData.find((cat) => cat._id === selectedCatId);
    setSelectedCatObject(foundCat);
    setProSubCat("");
    setTProSubCat("");
    setSelectedSubCatObject(null);
  };
  const handleChangeProSubCat = (event) => {
    const selectedSubCatId = event.target.value;
    setProSubCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      subCatId: selectedSubCatId,
      thirdSubCatId: "",
    }));
    const foundCat = selectedCatObject?.children?.find(
      (subCat) => subCat._id === selectedSubCatId
    );
    setSelectedSubCatObject(foundCat);
    setTProSubCat("");
  };

  const handleChangeProTSubCat = (event) => {
    setTProSubCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      thirdSubCatId: event.target.value,
    }));
  };

  const selectCatByName = (name) => {
    formFields.catName = name;
  };
  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };
  const selectThirdSubCatByName = (name) => {
    formFields.thirdSubCat = name;
  };
  const [isFeatured, setIsFeatured] = React.useState(false);

  const handleChangeIsFeatured = (event) => {
    setIsFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };
  const [proRam, setProRam] = React.useState([]);

  const handleChangeProRam = (event) => {
    const { value } = event.target;
    setProRam(typeof value === "string" ? value.split(",") : value);
    formFields.productRam =
      typeof value === "string" ? value.split(",") : value;
  };
  const [proWeight, setProWeight] = React.useState([]);

  const handleChangeProWeight = (event) => {
    const { value } = event.target;
    setProWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight =
      typeof value === "string" ? value.split(",") : value;
  };
  const [proSize, setProSize] = React.useState([]);

  const handleChangeProSize = (event) => {
    const { value } = event.target;
    setProSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = typeof value === "string" ? value.split(",") : value;
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
  const handleChangeSwitch = (e) => {
    setCheckedSwitch(e.target.checked);
    setFormFields((prev) => ({
      ...prev,
      isDisplayOnHomeBanner: e.target.checked,
    }));
  };
  const onChangeRating = (e) => {
    setFormFields({
      ...formFields,
      rating: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("please add product name");
      setIsLoading(false);
      return false;
    }
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
    editData(`/api/product/updateProduct/${id}`, formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success("Product Updated Succesfully");
          setIsLoading(false);
          navigate("/products");
          fetchDataFromApi(`/api/product/`).then((res) => {
            console.log(res);
            dispatch(setProData(res?.data));
          });
          dispatch(setIsOpenFullScreenPanel({ open: false }));
        } else {
          toast.error("Something Went Wrong");
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
    <section className="p-4 md:p-5 bg-gray-50 min-h-screen">
      <form
        className="form p-4 md:p-6 py-3 bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="scroll max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-2 md:pr-4">
          {/* Product Name */}
          <div className="grid grid-cols-1 mb-4">
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-1">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-10 md:h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-2 md:p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="grid grid-cols-1 mb-4">
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-1">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-24 md:!h-32 border border-black/30 outline-none focus:border-black/50 rounded-md p-2 md:p-3 text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          {/* Category Section - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-10 gap-3 md:gap-4">
            {/* Product Category */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Category
              </h3>
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

            {/* Product Sub Category */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Sub Category
              </h3>
              <div>
                {selectedCatObject?.children?.length !== 0 && (
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

            {/* Product Third Level Sub Category */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Third Level Sub Category
              </h3>
              <div>
                {selectedSubCatObject?.children !== 0 && (
                  <FormControl fullWidth size="small">
                    <InputLabel id="proTSubCat-label">
                      Select Third Level Sub Category
                    </InputLabel>
                    <Select
                      className="focus:!outline-black/50"
                      labelId="proTSubCat-label"
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

            {/* Product Price */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Price
              </h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Price"
                variant="outlined"
                className="w-full"
                size="small"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            {/* Product Old Price */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Old Price
              </h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Old Price"
                variant="outlined"
                className="w-full"
                size="small"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>
          </div>

          {/* Second Row - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-3 md:gap-4">
            {/* Is Featured */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Is Featured ?
              </h3>
              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="isFeatured-label">Select Featured</InputLabel>
                  <Select
                    className="focus:!outline-black/50"
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
            </div>

            {/* Product Stock */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Stock
              </h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter Stock"
                variant="outlined"
                className="w-full"
                size="small"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            {/* Product Brand */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Brand
              </h3>
              <TextField
                id="outlined-basic"
                type="text"
                label="Brand"
                variant="outlined"
                className="w-full"
                size="small"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>

            {/* Product Discount */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Discount
              </h3>
              <TextField
                id="outlined-basic"
                type="number"
                label="Discount"
                variant="outlined"
                className="w-full"
                size="small"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>
          </div>

          {/* Third Row - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-3 md:gap-4">
            {/* Product RAMS */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product RAMS
              </h3>
              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="proRam-label">Select RAM</InputLabel>
                  <Select
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proRam-label"
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

            {/* Product Weight */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Weight
              </h3>
              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="proWeight-label">Select Weight</InputLabel>
                  <Select
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proWeight-label"
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

            {/* Product Size */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Size
              </h3>
              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="proSize-label">Select Size</InputLabel>
                  <Select
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proSize-label"
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

            {/* Product Rating */}
            <div className="col-span-1">
              <h3 className="text-base md:text-lg font-[500] mb-2 md:mb-3">
                Product Rating
              </h3>
              <Rating
                name="half-rating"
                value={formFields.rating}
                precision={0.5}
                onChange={onChangeRating}
                size="medium"
              />
            </div>
          </div>

          {/* Media & Images */}
          <div className="w-full p-3 md:p-5 px-0">
            <h3 className="font-bold text-base md:text-lg mb-3">
              Media & Images
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-4">
              {previews?.length !== 0 &&
                previews?.map((image, index) => (
                  <div key={image} className="uploadImageWrapper relative">
                    <span
                      className="cursor-pointer"
                      onClick={() => removeImg(image, index)}
                    >
                      <IoClose className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-lg md:text-xl z-20" />
                    </span>
                    <div className="lazyload w-full rounded-md overflow-hidden border border-dashed border-black/30 h-20 md:h-[100px] lg:h-[150px] bg-gray-100 hover:bg-gray-200 text-gray-500 relative">
                      <LazyLoadImage
                        className="w-full h-full object-cover"
                        effect="blur"
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

          {/* Banner Images */}
          <div className="w-full p-3 md:p-5 px-0">
            <div className="shadow-md bg-white p-3 md:p-4 w-full relative">
              <Switch
                onChange={handleChangeSwitch}
                checked={checkedSwitch}
                className="!absolute right-2 md:right-5 top-3"
                {...label}
                size="small"
              />
              <h3 className="font-bold text-base md:text-lg mb-3 pr-10">
                Banner Images
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-4">
                {bannerPreviews?.length !== 0 &&
                  bannerPreviews?.map((image, index) => (
                    <div key={image} className="uploadImageWrapper relative">
                      <span
                        className="cursor-pointer"
                        onClick={() => removeImg2(image, index)}
                      >
                        <IoClose className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-lg md:text-xl z-20" />
                      </span>
                      <div className="lazyload w-full rounded-md overflow-hidden border border-dashed border-black/30 h-20 md:h-[100px] lg:h-[150px] bg-gray-100 hover:bg-gray-200 text-gray-500 relative">
                        <LazyLoadImage
                          className="w-full h-full object-cover"
                          effect="blur"
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
                  disable={disable2}
                  setDisable={setDisable2}
                />
              </div>

              <h3 className="font-bold text-base md:text-lg mb-3 mt-4">
                Banner Title
              </h3>
              <input
                type="text"
                className="w-full md:w-1/2 h-10 md:h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-2 md:p-3 text-sm"
                name="bannerTitleName"
                value={formFields.bannerTitleName}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>

        <hr className="my-4 md:my-6" />
        <Button
          type="submit"
          className="!p-2 md:!p-3 btn-blue w-full !mt-4 md:!mt-8"
        >
          <BsCloudUpload className="mr-2 text-lg md:text-xl" />
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

export default EditProduct;
