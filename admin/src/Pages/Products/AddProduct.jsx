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
import { deleteImages, fetchDataFromApi } from "../../utils/api";
const AddProduct = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const catData = useSelector((state) => state.catData.catData);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
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
  const [previews, setPreviews] = useState([]);
  const setCatPreviews = (previewArr) => {
    setPreviews(previewArr);
    setFormFields({
      ...formFields,
      images: previewArr,
    });
  };
  const removeImg = (img, idx) => {
    setIsLoading(true);
    let imageArr = [];
    imageArr = previews;
    deleteImages(`/api/product/deleteImage?img=${img}`, {
      credentials: true,
    }).then((res) => {
      imageArr.splice(idx, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        setFormFields({
          ...formFields,
          images: imageArr,
        });
      }, 100);
      setDisable(false);
      setIsLoading(false);
    });
  };
  const [proCat, setProCat] = React.useState("");
  const [proSubCat, setProSubCat] = React.useState("");
  const [proTSubCat, setTProSubCat] = React.useState("");
  const handleChangeProCat = (event) => {
    setProCat(event.target.value);
    formFields.catId = event.target.value;
  };

  const handleChangeProSubCat = (event) => {
    setProSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };
  const handleChangeProTSubCat = (event) => {
    setTProSubCat(event.target.value);
    formFields.thirdSubCatId = event.target.value;
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
  const [isFeatured, setIsFeatured] = React.useState("");

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
  const onChangeRating = (e) => {
    setFormFields({
      ...formFields,
      rating: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
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
              <div></div>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-3">Product Sub Category</h3>
              <div>
                {catData?.length !== 0 && (
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
                      {catData?.map(
                        (cat) =>
                          cat?.children?.length !== 0 &&
                          cat?.children?.map((subCat) => (
                            <MenuItem
                              onClick={() => selectSubCatByName(subCat?.name)}
                              key={subCat?.name}
                              value={subCat?._id}
                            >
                              {subCat?.name}
                            </MenuItem>
                          ))
                      )}
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
                {catData?.length !== 0 && (
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
                      {catData?.map(
                        (cat) =>
                          cat?.children?.length !== 0 &&
                          cat?.children?.map(
                            (subCat) =>
                              subCat?.children?.length !== 0 &&
                              subCat?.children?.map((thirdSubCat) => (
                                <MenuItem
                                  onClick={() =>
                                    selectThirdSubCatByName(thirdSubCat?.name)
                                  }
                                  key={thirdSubCat?.name}
                                  value={thirdSubCat?._id}
                                >
                                  {thirdSubCat?.name}
                                </MenuItem>
                              ))
                          )
                      )}
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
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proWeight-label"
                    size="medium"
                    id="proWeight"
                    value={proWeight}
                    label="Select Weight"
                    onChange={handleChangeProWeight}
                  >
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
                    multiple
                    className="focus:!outline-black/50"
                    labelId="proSize-label"
                    size="medium"
                    id="proSize"
                    value={proSize}
                    label="Select Size"
                    onChange={handleChangeProSize}
                  >
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
        </div>
        <hr />
        <Button type="submit" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
