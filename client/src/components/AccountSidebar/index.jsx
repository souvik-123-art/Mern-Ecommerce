import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, fetchDataFromApi } from "../../utils/api";
import { setIsLogin } from "../../redux/Slices/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { setPreviews } from "../../redux/Slices/userImage";
export const AccountSidebar = () => {
  // const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const previews = useSelector((state) => state.userImage.previews);
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
        } else {
          toast.error("please upload JPG, PNG or WEBP image");
          setUploading(false);
          return false;
        }
      }
      uploadImage(apiEndPoint, formData).then((res) => {
        console.log(res);
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avatar);
        dispatch(setPreviews(avatar));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accesstoken")}`,
      { withCredentials: true }
    ).then((res) => {
      console.log(res);
      if (!res.error) {
        dispatch(setIsLogin(false));
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        navigate("/");
      }
    });
  };
  return (
    <div className="card sticky top-[100px] sm:top-[120px] md:top-[150px] bg-white shadow-md rounded-md overflow-hidden w-full sm:w-[80%] md:w-[100%] lg:w-[300px] mx-auto md:mx-0">
      <div className="w-full py-3 flex items-center justify-center flex-col px-2 sm:px-4">
        <div className="mb-4 group w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden relative flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress className="!w-[25px] !h-[25px]" color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ))
              ) : (
                <img
                  src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                  alt="avatar"
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
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
            />
          </div>
        </div>

        <h4 className="text-xl sm:text-2xl font-semibold truncate text-center">
          {userDetails?.name}
        </h4>
        <p className="text-xs sm:text-sm text-center truncate">
          {userDetails?.email}
        </p>
      </div>

      <ul className="pb-4 bg-[#f1f1f1] myAccount">
        {[
          { to: "/my-account", icon: <FaRegUser />, label: "My Profile" },
          { to: "/my-orders", icon: <LuBox />, label: "My Orders" },
          { to: "/my-list", icon: <FaRegHeart />, label: "My List" },
          { to: "/address", icon: <MdOutlineMapsHomeWork />, label: "Address" },
        ].map((item, idx) => (
          <li className="w-full" key={idx}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Button className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-sm sm:!text-md !text-black/80">
                {item.icon} {item.label}
              </Button>
            </NavLink>
          </li>
        ))}
        <li className="w-full">
          <Button
            onClick={logout}
            className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-sm sm:!text-md !text-black/80"
          >
            <FiLogOut className="text-xl" /> Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};
