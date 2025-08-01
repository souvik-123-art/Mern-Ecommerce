import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const navigate = useNavigate()
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(formFields).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      toast.error("enter your full name");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      toast.error("enter your mobile number");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      toast.error("enter your email address");
      setIsLoading(false);
      return false;
    }
    if (formFields.password === "") {
      toast.error("enter your password");
      setIsLoading(false);
      return false;
    }
    if (formFields.password !== formFields.conPassword) {
      toast.error("incorrect confirm password");
      setIsLoading(false);
      return false;
    }
    postData("/api/user/register", { ...formFields, panel: "client" }).then(
      (res) => {
        if (!res?.error) {
          setIsLoading(false);
          toast.success(res.message);
          setFormFields({
            name: "",
            mobile: "",
            email: "",
            password: "",
            conPassword: "",
          });
          navigate("/verify-email");
        } else {
          toast.error(res.message);
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <section className="login py-10">
      <div className="container mx-auto">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-2xl font-bold text-gray-700">
            Sign Up
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="username"
                label="Username *"
                value={formFields.name}
                variant="outlined"
                className="w-full"
                name="name"
                onChange={onChangeInput}
                disabled={isLoading ? true : false}
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="number"
                id="mobileNo"
                label="Mobile No *"
                value={formFields.mobile}
                variant="outlined"
                className="w-full"
                name="mobile"
                onChange={onChangeInput}
                disabled={isLoading ? true : false}
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                value={formFields.email}
                variant="outlined"
                className="w-full"
                name="email"
                onChange={onChangeInput}
                disabled={isLoading ? true : false}
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password *"
                value={formFields.password}
                variant="outlined"
                className="w-full"
                name="password"
                onChange={onChangeInput}
                disabled={isLoading ? true : false}
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
                id="conPassword"
                label="Confirm Password *"
                value={formFields.conPassword}
                variant="outlined"
                className="w-full"
                name="conPassword"
                onChange={onChangeInput}
                disabled={isLoading ? true : false}
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
            <Button
              type="submit"
              disabled={!validValue}
              className="!px-6 !mt-5 !w-full !flex !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all"
            >
              {isLoading ? (
                <CircularProgress
                  className="!w-[25px] !h-[25px]"
                  color="inherit"
                />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-md font-light">
            Already have an account?&nbsp;
            <Link className="link transition font-semibold" to="/login">
              Login
            </Link>
          </p>
          <hr className="mt-3" />
          <p className="text-center font-semibold text-sm mt-4">
            Or create with social account
          </p>
          <Button className="!text-red-300 !w-full !bg-gray-700 !font-medium !rounded !transition !text-sm !px-5 !py-2.5 !flex !items-center !mt-3 !justify-center !mb-2 hover:!bg-gray-600">
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign up with Google
          </Button>
        </div>
      </div>
    </section>
  );
};
