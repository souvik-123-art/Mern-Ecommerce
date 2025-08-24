import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteImages, editData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useEffect } from "react";
import { setBlogData } from "../../redux/slices/blogSlice";

const EditBlog = () => {
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
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const id = isOpenFullScreenPanel.id;
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
    editData(`/api/blog/updateBlog/${id}`, formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res.data.message);
          setIsLoading(false);
          fetchDataFromApi("/api/blog").then((res) => {
            dispatch(setBlogData(res?.data));
          });
          navigate("/blogList");
          dispatch(setIsOpenFullScreenPanel({ open: false }));
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  useEffect(() => {
    fetchDataFromApi(`/api/blog/${id}`).then((res) => {
      setFormFields({
        title: res?.blog?.title,
        images: res?.blog?.images,
        description: res?.blog?.description,
      });
      setPreviews(res?.blog?.images);
    });
  }, [id]);
  return (
    <section className="p-5 bg-gray-50 h-screen relative">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-5 gap-4">
            <div className="col-span-1 mb-3">
              <h3 className="text-lg font-[500] mb-2">Blog Title</h3>
              <input
                type="text"
                name="title"
                value={formFields.title}
                onChange={onChangeInput}
                className="h-[55px] w-full border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
              />
            </div>
            <div className="col-span-1 mb-3">
              <h3 className="text-lg font-[500] mb-2">Blog Description</h3>
              <textarea
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
                rows={10}
                className=" w-full border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
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
              url="/api/blog/uploadImages"
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

export default EditBlog;
