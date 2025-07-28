import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Collapse } from "react-collapse";
import TextField from "@mui/material/TextField";
import { AccountSidebar } from "../../components/AccountSidebar";
import toast from "react-hot-toast";
import { editData, fetchDataFromApi, updatePassword } from "../../utils/api";
import "react-international-phone/style.css";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { setUserDetails } from "../../redux/Slices/userDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { PhoneInput } from "react-international-phone";

export const MyAccount = () => {
  const [userId, setUserId] = useState("");
  const [passOpen, setPassOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
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
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
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
      }
    );
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

  return (
    <section className="myAccountSec py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-0">
              <h2 className="pb-3 text-2xl font-semibold">My Profile</h2>
              <Button
                className="!ml-auto !text-primary"
                onClick={() => setPassOpen(true)}
              >
                Change Password
              </Button>
            </div>
            <hr />
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
            <div className="card bg-white p-5 shadow-md rounded-md">
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
                    className="!px-6 !mt-5 !py-2 !bg-primary !text-white hover:!bg-gray-900 !w-full !transition-all !flex "
                  >
                    {isLoading2 ? (
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
          </Collapse>
        </div>
      </div>
    </section>
  );
};
