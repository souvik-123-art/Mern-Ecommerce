import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink, useNavigate } from "react-router-dom";
import { TiUserAddOutline } from "react-icons/ti";
import { LuLogIn } from "react-icons/lu";
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData("/api/user/forgot-password", {
      email: email,
      panel: "admin",
    }).then((res) => {
      if (!res.error) {
        setIsLoading(false);
        toast.success(res.message);
        localStorage.removeItem("userEmail");
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="login">
      <div className="container mx-auto">
        <header className="admin-auth w-full py-4 flex justify-between mb-8">
          <div className="logo w-40">
            <img
              className="w-full object-contain"
              src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
              alt=""
            />
          </div>
          <div className="auth flex items-center gap-2">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/signin"
            >
              {" "}
              <Button className=" !px-5 !flex !items-center gap-2 !py-2 !bg-[#ddd] !text-black !rounded-full">
                <LuLogIn className="text-xl" />
                Sign In
              </Button>
            </NavLink>
            <span className="block h-[20px] w-[1px] bg-gray-300"></span>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/signup"
            >
              <Button className=" !px-5 !flex !items-center gap-2 !py-2 !bg-[#ddd] !text-black !rounded-full">
                <TiUserAddOutline className="text-xl" />
                Sign Up
              </Button>
            </NavLink>
          </div>
        </header>
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-2xl font-bold text-gray-700">
            Forgot Password
          </h3>
          <p className="text-gray-700 text-sm mt-2 mb-4 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-3">
              <TextField
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Id"
                variant="outlined"
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="!px-6 !mt-5 !w-full !flex !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all"
            >
              {isLoading ? (
                <CircularProgress
                  className="!w-[25px] !h-[25px]"
                  color="inherit"
                />
              ) : (
                "Send Reset Password Link"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
