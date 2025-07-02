import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";
import { TiUserAddOutline } from "react-icons/ti";
export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  return (
    <section className="resetPassword">
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
            Reset Password
          </h3>
          <form className="w-full mt-5">
            <div className="form-group w-full mb-3 relative">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className="!w-[40px] !min-w-[40px] !rounded-full
                    !text-black !bg-transparent
                   !h-[40px] !text-xl !absolute !z-5 !right-2 !top-2 opacity-75 hover:!text-primary !transition"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </Button>
            </div>
            <div className="form-group w-full mb-3 relative">
              <TextField
                type={showConPassword ? "text" : "password"}
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setShowConPassword(!showConPassword)}
                className="!w-[40px] !min-w-[40px] !rounded-full
                    !text-black !bg-transparent
                   !h-[40px] !text-xl !absolute !z-5 !right-2 !top-2 opacity-75 hover:!text-primary !transition"
              >
                {showConPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </Button>
            </div>
            <Button className="!px-6 !mt-5 !w-full !block !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
