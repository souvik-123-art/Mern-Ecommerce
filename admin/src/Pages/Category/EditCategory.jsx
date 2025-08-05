import { useEffect, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
const EditCategory = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const id = isOpenFullScreenPanel?.id;
  useEffect(() => {
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      formFields.name = res?.category?.name;
      setPreviews(res?.category?.images);
    });
    if (previews?.length !== 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, []);

  const setCatPreviews = (previewArr) => {
    setPreviews(previewArr);
    setFormFields({
      ...formFields,
      images: previewArr,
    });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    formFields.images = previews;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("please add category name");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      toast.error("please select category image");
      setIsLoading(false);
      return false;
    }
    editData(`/api/category/updateCategory/${id}`, formFields, {
      credentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res.data.message);
          setIsLoading(false);
          dispatch(setIsOpenFullScreenPanel({ open: false }));
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    });
  };
  const removeImg = (img, idx) => {
    setIsLoading(true);
    let imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?img=${img}`, {
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
          <div className="grid grid-cols-1 mb-3">
            <div className="col-span-1">
              <h3 className="text-lg font-[500] mb-1">Product Name</h3>
              <input
                type="text"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
                className="w-[30%] h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
              />
            </div>
          </div>
          <h3 className="text-lg font-[500] mb-2">Category Image</h3>
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
              url="/api/category/uploadImages"
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

export default EditCategory;
