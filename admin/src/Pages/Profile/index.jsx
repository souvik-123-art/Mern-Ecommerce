import CircularProgress from "@mui/material/CircularProgress";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setPreviews } from "../../redux/slices/userImage";
import { editData, fetchDataFromApi, uploadImage } from "../../utils/api";
import { FaPlus } from "react-icons/fa6";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Collapse } from "react-collapse";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const previews = useSelector((state) => state.userImage.previews);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const [userId, setUserId] = useState("");
  const [passOpen, setPassOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (userDetails?._id !== "" && userDetails?._id !== undefined) {
      setUserId(userDetails?._id);
      setFormFields({
        name: userDetails?.name,
        email: userDetails?.email,
        mobile: userDetails?.mobile,
      });
    }
  }, [userDetails]);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(formFields).every((el) => el);
  const validValue2 = Object.values(changePassword).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("enter your full name");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      toast.error("enter your email");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      toast.error("enter your mobile no.");
      setIsLoading(false);
      return false;
    }
    editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.data?.error) {
        console.log(res);
        if (!res?.data?.user?.isVerified) {
          navigate("/verify-email");
          toast.success("verify your email");
        } else {
          toast.success(res.data.message);
        }
        setFormFields({
          name: res.data.user.name,
          email: res.data.user.email,
          mobile: res.data.user.mobile,
        });
        fetchDataFromApi(`/api/user/user-details`).then((res) => {
          dispatch(setUserDetails(res.data));
        });
        setIsLoading(false);
      } else {
        toast.error(res.data.message);
        setIsLoading(false);
      }
    });
  };
  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (!changePassword.oldPassword) {
      toast.error("please enter old password");
      setIsLoading2(false);
      return;
    }
    if (!changePassword.newPassword) {
      toast.error("please enter new password");
      setIsLoading2(false);
      return;
    }

    try {
      const res = await updatePassword(
        `/api/user/changePassword/${userId}`,
        changePassword
      );

      toast.success(res.data.message);

      setChangePassword({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading2(false);
    }
  };
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const userAvatar = [];
    if (userDetails?.avatar !== "" && userDetails?.avatar !== undefined) {
      userAvatar.push(userDetails?.avatar);
      dispatch(setPreviews(userAvatar));
    }
  }, [userDetails]);
  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];
  const formData = new FormData();
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formData.append(`avatar`, file);
          uploadImage(apiEndPoint, formData).then((res) => {
            console.log(res);
            setUploading(false);
            let avatar = [];
            avatar.push(res?.data?.avatar);
            dispatch(setPreviews(avatar));
          });
        } else {
          toast.error("please upload JPG, PNG or WEBP image");
          setUploading(false);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden h-[75vh] w-[75%]">
        <div className="flex items-center pb-0">
          <h2 className="pb-3 text-2xl font-semibold">My Profile</h2>
          <Button
            className="!ml-auto !text-primary"
            onClick={() => setPassOpen(true)}
          >
            Change Password
          </Button>
        </div>
        <div className="w-full py-3 flex items-center justify-center flex-col">
          <div className="mb-4 group w-[110px] h-[110px] rounded-full overflow-hidden relative flex items-center justify-center bg-gray-200">
            {uploading ? (
              <CircularProgress
                className="!w-[25px] !h-[25px]"
                color="inherit"
              />
            ) : (
              <>
                {previews?.length !== 0 ? (
                  previews?.map((img) => {
                    return (
                      <img
                        src={img}
                        key={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    );
                  })
                ) : (
                  <img
                    src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </>
            )}

            <div className="overlay transition-all duration-200 opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-10 bg-black/40 flex items-center justify-center cursor-pointer">
              <FaCloudUploadAlt className="text-white text-2xl cursor-pointer" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="absolute inset-0 opacity-0  cursor-pointer"
                onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              />
            </div>
          </div>
          <h4 className="text-2xl font-semibold">{userDetails?.name}</h4>
          <p className="text-sm">{userDetails?.email}</p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-1/2">
              <div className="">
                <h3 className="text-lg font-[500] mb-1">Full Name</h3>
                <input
                  type="text"
                  className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
                  name="name"
                  placeholder="enter full name"
                  disabled={isLoading ? true : false}
                  onChange={onChangeInput}
                  value={formFields.name}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="">
                <h3 className="text-lg font-[500] mb-1">Email Address</h3>
                <input
                  type="email"
                  className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-sm p-3 text-sm"
                  name="email"
                  placeholder="enter email address"
                  disabled={isLoading ? true : false}
                  onChange={onChangeInput}
                  value={formFields.email}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="">
              <h3 className="text-lg font-[500] mb-1">Mobile No.</h3>
              <PhoneInput
                defaultCountry="in"
                value={String(formFields.mobile)}
                name="mobile"
                disabled={isLoading ? true : false}
                onChange={(phone) => {
                  setFormFields({
                    ...formFields,
                    mobile: phone,
                  });
                }}
              />
            </div>
          </div>
          <br />
          <div
            className="flex items-center justify-center p-5 border border-dashed border-black/30 bg-[#f1fafa] hover:bg-[#e1f3f3] cursor-pointer transition duration-200"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add New Address",
                })
              )
            }
          >
            <span className="text-sm font-semibold flex gap-2 items-center">
              {" "}
              <FaPlus />
              Add Address
            </span>
          </div>
          <div className="flex items-center">
            <Button
              type="submit"
              disabled={!validValue}
              className="!px-6 !mt-5 !py-2 !bg-primary !text-white hover:!bg-gray-900 !transition-all !self-center !flex "
            >
              {isLoading ? (
                <CircularProgress
                  className="!w-[25px] !h-[25px]"
                  color="inherit"
                />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
      <Collapse isOpened={passOpen}>
        <div className="card bg-white p-5 shadow-md rounded-md w-[75%]">
          <div className="flex items-center pb-3">
            <h2 className="pb-0">Change Password</h2>

            <IoMdClose
              onClick={() => setPassOpen(false)}
              className="text-2xl ml-auto cursor-pointer text-black link transition"
            />
          </div>
          <hr />
          <form className="mt-8" onSubmit={handleSubmitPasswordChange}>
            <div className="flex items-center gap-5">
              <div className="w-1/2">
                <TextField
                  label="Old Password"
                  type="text"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="oldPassword"
                  disabled={isLoading2 ? true : false}
                  onChange={onChangeInput}
                  value={changePassword.oldPassword}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  label="New Password"
                  type="text"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="newPassword"
                  disabled={isLoading2 ? true : false}
                  onChange={onChangeInput}
                  value={changePassword.newPassword}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Button
                type="submit"
                disabled={!validValue2}
                className="!px-6 !mt-5 !py-2 !bg-primary !text-white hover:!bg-gray-900 !transition-all !flex "
              >
                {isLoading2 ? (
                  <CircularProgress
                    className="!w-[25px] !h-[25px]"
                    color="inherit"
                  />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
