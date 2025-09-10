import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { setIsLogin } from "../../redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { postData } from "../../utils/api";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../FireBase";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleForgot = () => {
    localStorage.setItem("userEmail", formFields.email);
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    postData(
      "/api/user/login",
      { ...formFields, panel: "client" },
      { withCredentials: true }
    ).then((res) => {
      if (!res?.error) {
        toast.success(res.message);
        setFormFields({
          email: "",
          password: "",
        });
        localStorage.setItem("accesstoken", res.data.accesstoken);
        localStorage.setItem("refreshtoken", res.data.refreshtoken);
        setIsLoading(false);
        dispatch(setIsLogin(true));
        navigate("/");
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    });
  };

  const authWithGoogle = () => {
    setIsLoading2(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const fields = {
          email: user.providerData[0].email,
          panel: "client",
        };

        postData("/api/user/loginWithGoogle", fields).then((res) => {
          if (!res?.error) {
            setIsLoading2(false);
            toast.success(res?.message);
            localStorage.setItem("accesstoken", res.data.accesstoken);
            localStorage.setItem("refreshtoken", res.data.refreshtoken);
            dispatch(setIsLogin(true));
            navigate("/");
          } else {
            setIsLoading2(false);
            toast.error(res?.message);
          }
        });
      })
      .catch((error) => {
        setIsLoading2(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("Google authentication failed");
      });
  };

  return (
    <section className="login py-6 md:py-10 px-4">
      <div className="container mx-auto max-w-md md:max-w-lg">
        <div className="card shadow-md w-full m-auto rounded-md bg-white p-4 md:p-6 lg:p-8">
          <h3 className="text-center text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6">
            Login Your Account
          </h3>

          <form className="w-full mt-3 md:mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-4 md:mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                value={formFields.email}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
                name="email"
                disabled={isLoading}
                size="small"
              />
            </div>

            <div className="form-group w-full mb-3 relative">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                onChange={onChangeInput}
                disabled={isLoading}
                size="small"
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className="!w-[40px] !min-w-[40px] !rounded-full
                  !text-black !bg-transparent
                  !h-[40px] !text-xl !absolute !z-5 !right-1 !top-1 opacity-75 hover:!text-primary !transition"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </Button>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm md:text-md font-semibold text-black/70 link block mb-4 md:mb-0"
              onClick={handleForgot}
            >
              Forgot Password?
            </Link>

            <Button
              type="submit"
              disabled={!validValue || isLoading}
              className="!px-6 !mt-4 !w-full !flex !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all !h-12"
              variant="contained"
            >
              {isLoading ? (
                <CircularProgress
                  className="!w-[25px] !h-[25px]"
                  color="inherit"
                />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="mt-5 md:mt-6 text-center text-sm md:text-md font-light">
            Don't have an account?&nbsp;
            <Link
              className="link transition font-semibold text-primary"
              to="/register"
            >
              Sign Up
            </Link>
          </p>

          <div className="relative my-5 md:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={authWithGoogle}
            disabled={isLoading2}
            className="!bg-gray-700 !text-white !font-medium !rounded !transition !text-sm !px-5 !py-2.5 !flex !items-center !mt-2 !justify-center w-full !mb-2 hover:!bg-gray-600 !h-12"
            variant="contained"
          >
            {isLoading2 ? (
              <CircularProgress
                className="!w-[20px] !h-[20px]"
                color="inherit"
              />
            ) : (
              <>
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
                Sign in with Google
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};
