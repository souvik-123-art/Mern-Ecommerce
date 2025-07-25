import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { TiUserAddOutline } from "react-icons/ti";
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  return (
    <section className="signup">
      <div className="container mx-auto">
        <header className="admin-auth py-4 w-full flex justify-between mb-8">
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
            Sign Up
          </h3>
          <form className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="username"
                label="Username *"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="number"
                id="mobileNo"
                label="Mobile No *"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password *"
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
                id="password"
                label="Confirm Password *"
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
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-center text-md font-light">
            Already have an account?&nbsp;
            <Link className="link transition font-semibold" to="/signin">
              Login
            </Link>
          </p>
          <hr className="mt-3" />
          <p className="text-center font-semibold text-sm mt-4">
            Or create with social account
          </p>
          <Button className="!text-red-300 !w-full !bg-gray-700 !font-medium !rounded !transition !text-sm !px-5 !py-2.5 !flex !items-center !mt-3 !justify-center !mb-2 hover:!bg-gray-600">
            <svg
              class="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Sign up with Google
          </Button>
        </div>
      </div>
    </section>
  );
};
