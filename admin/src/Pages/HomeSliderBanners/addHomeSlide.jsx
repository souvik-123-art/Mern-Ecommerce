import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { setLgBanners } from "../../redux/slices/HomeBannerSlice";
const AddHomeSlide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    images: [],
  });
  const [disable, setDisable] = useState(false);
  const [previews, setPreviews] = useState([]);
  const setCatPreviews = (previewArr) => {
    setPreviews(previewArr);
    setFormFields((prevState) => ({
      ...prevState,
      images: previewArr,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (previews?.length === 0) {
      toast.error("please select home banner image");
      setIsLoading(false);
      return false;
    }
    postData("/api/homeBanners/add", formFields, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            toast.success(res.message);
            setIsLoading(false);
            navigate("/homeSlider/list");
            dispatch(setIsOpenFullScreenPanel({ open: false }));
            fetchDataFromApi("/api/homeBanners").then((res) => {
              dispatch(setLgBanners(res?.data));
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
  const removeImg = (img, idx) => {
    setIsLoading(true);
    let imageArr = [];
    imageArr = previews;
    deleteImages(`/api/homeBanners/deleteImage?img=${img}`, {
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
  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
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
              url="/api/homeBanners/uploadImages"
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
        className={`absolute inset-0 bg-white/40 ${
          isLoading ? "flex" : "hidden"
        } justify-center items-center z-50 left-0 top-0`}
      >
        <CircularProgress className="!text-primary" />
      </div>
    </section>
  );
};

export default AddHomeSlide;
