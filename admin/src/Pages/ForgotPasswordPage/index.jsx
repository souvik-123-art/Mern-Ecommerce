import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { LuLogIn } from "react-icons/lu";
import { TiUserAddOutline } from "react-icons/ti";

export const ForgotPassword = () => {
  return (
    <section className="forgotPassword">
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
          <h3 className="text-center text-3xl font-bold text-gray-700">
            Forgot Password
          </h3>
          <p className="text-sm font-semibold text-center mt-4 text-black/60">Having trouble to sign in? Reset Your Password
          </p>
          <form className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Enter Your Email"
                variant="outlined"
                className="w-full"
              />
            </div>
            <hr className="mt-3" />
            <Button className="!px-6 !mt-5 !w-full !block !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all">
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
