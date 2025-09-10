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
import { setBlogData } from "../../redux/slices/blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    images: [],
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);

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
      await deleteImages(`/api/blog/deleteImage?img=${img}`, {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.title === "") {
      toast.error("please add blog title");
      setIsLoading(false);
      return false;
    }
    // ... (your other validation checks)
    if (formFields.description === "") {
      toast.error("please add blog description");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      toast.error("please add blog image");
      setIsLoading(false);
      return false;
    }
    postData("/api/blog/add", formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res.message);
          setIsLoading(false);
          fetchDataFromApi("/api/blog").then((res) => {
            dispatch(setBlogData(res?.data));
          });
          navigate("/blogList");
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
    <section className="p-4 sm:p-5 bg-gray-50 min-h-screen relative">
      <form className="form p-4 sm:p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-2 sm:pr-4 pt-4">
          <div className="grid grid-cols-1 gap-4 mb-5">
            <div>
              <h3 className="text-lg font-medium mb-2">Blog Title</h3>
              <input
                type="text"
                name="title"
                value={formFields.title}
                onChange={onChangeInput}
                className="h-[50px] w-full border border-black/30 rounded-sm p-3 text-sm focus:outline-none focus:border-black/50"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Blog Description</h3>
              <textarea
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
                rows={10}
                className="w-full border border-black/30 rounded-sm p-3 text-sm focus:outline-none focus:border-black/50"
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
              url="/api/blog/uploadImages"
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

export default AddBlog;
