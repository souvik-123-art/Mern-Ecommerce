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
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import toast from "react-hot-toast";
import { setBannerV1 } from "../../redux/slices/HomeBannerSlice";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import { useEffect } from "react";

const EditBannerV1 = () => {
  const dispatch = useDispatch();
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const id = isOpenFullScreenPanel.id;
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
    editData(`/api/bannerV1/updateBannerV1/${id}`, formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res?.data?.message);
          setIsLoading(false);
          fetchDataFromApi("/api/bannerV1").then((res) => {
            dispatch(setBannerV1(res?.data));
          });
          navigate("/bannerV1List");
          dispatch(setIsOpenFullScreenPanel({ open: false }));
        } else {
          toast.error(res?.data?.message);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  useEffect(() => {
    fetchDataFromApi(`/api/bannerV1/${id}`).then((res) => {
      setFormFields({
        bannerTitle: res?.data?.bannerTitle,
        images: res?.data?.images,
        catId: res?.data?.catId,
        subCatId: res?.data?.subCatId,
        thirdSubCatId: res?.data?.thirdSubCatId,
        price: res?.data?.price,
        align: res?.data?.align,
      });
      setProCat(res?.data?.catId);
      setProSubCat(res?.data?.subCatId);
      setTProSubCat(res?.data?.thirdSubCatId);
      setPreviews(res?.data?.images);
      const foundCat = catData.find((cat) => cat._id === res.data.catId);
      setSelectedCatObject(foundCat);
      const foundSubCat = foundCat?.children?.find(
        (subCat) => subCat._id === res.data.subCatId
      );
      setSelectedSubCatObject(foundSubCat);
    });
  }, [id, catData]);
  return (
    <section className="p-4 sm:p-5 bg-gray-50 min-h-screen relative">
      <form className="form p-4 sm:p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-2 sm:pr-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
            <div>
              <h3 className="text-lg font-medium mb-2">Banner Title</h3>
              <input
                type="text"
                name="bannerTitle"
                value={formFields.bannerTitle}
                onChange={onChangeInput}
                className="h-[50px] w-full border border-black/30 rounded-sm p-3 text-sm focus:outline-none focus:border-black/50"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Banner Category</h3>
              {catData?.length !== 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proCat-label">Select Category</InputLabel>
                  <Select
                    labelId="proCat-label"
                    value={proCat}
                    label="Select Category"
                    onChange={handleChangeProCat}
                  >
                    {catData?.map((cat) => (
                      <MenuItem key={cat?._id} value={cat?._id}>
                        {cat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Banner Sub Category</h3>
              {selectedCatObject?.children?.length !== 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proSubCat-label">
                    Select Sub Category
                  </InputLabel>
                  <Select
                    labelId="proSubCat-label"
                    value={proSubCat}
                    label="Select Sub Category"
                    onChange={handleChangeProSubCat}
                  >
                    {selectedCatObject?.children?.map((subCat) => (
                      <MenuItem key={subCat?._id} value={subCat?._id}>
                        {subCat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                Third Level Sub Category
              </h3>
              {selectedSubCatObject?.children?.length !== 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel id="proTSubCat-label">
                    Select Third Level Sub Category
                  </InputLabel>
                  <Select
                    labelId="proTSubCat-label"
                    value={proTSubCat}
                    label="Select Third Level Sub Category"
                    onChange={handleChangeProTSubCat}
                  >
                    {selectedSubCatObject?.children?.map((thirdSubCat) => (
                      <MenuItem key={thirdSubCat?._id} value={thirdSubCat?._id}>
                        {thirdSubCat?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Text Align</h3>
              <FormControl fullWidth size="small">
                <InputLabel id="align-label">Select Align</InputLabel>
                <Select
                  labelId="align-label"
                  value={formFields.align || ""}
                  label="Select Align"
                  onChange={handleChangeAlign}
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Price</h3>
              <input
                type="number"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
                className="h-[50px] w-full border border-black/30 rounded-sm p-3 text-sm focus:outline-none focus:border-black/50"
              />
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">Banner Image</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews?.length !== 0 &&
              previews?.map((image, index) => (
                <div key={image} className="uploadImageWrapper relative">
                  <span
                    className="cursor-pointer"
                    onClick={() => removeImg(image, index)}
                  >
                    <IoClose className="absolute text-white bg-red-500 p-1 rounded-full -right-1 -top-1 text-xl z-20" />
                  </span>

                  <div className="w-full rounded-md overflow-hidden border border-dashed border-black/30 h-[120px] bg-gray-100 hover:bg-gray-200 relative">
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      effect="blur"
                      wrapperProps={{ style: { transitionDelay: "1s" } }}
                      alt="banner"
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

        <Button type="submit" className="!p-3 btn-blue w-full mt-6">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>

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

export default EditBannerV1;
