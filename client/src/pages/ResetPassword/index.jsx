import Button from "@mui/material/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";
export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    password: "",
    conPassword: "",
  });
  const { token } = useParams();
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
  const validValue = Object.values(formFields).every((el) => el);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.password === "") {
      toast.error("enter your password");
      setIsLoading(false);
      return false;
    }
    if (formFields.conPassword === "") {
      toast.error("enter your confirm password");
      setIsLoading(false);
      return false;
    }
    if (formFields.password !== formFields.conPassword) {
      toast.error("incorrect confirm password");
      setIsLoading(false);
      return false;
    }
    postData(`/api/user/reset-password/${token}`, formFields).then((res) => {
      if (!res.error) {
        toast.success(res.message);
        setIsLoading(false);
        setFormFields({
          password: "",
          conPassword: "",
        });
        navigate("/login");
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="resetPass py-6 md:py-10 px-4">
      <div className="container mx-auto max-w-md md:max-w-lg">
        <div className="card shadow-md w-full m-auto rounded-md bg-white p-4 md:p-6 lg:p-8">
          <h3 className="text-center text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6">
            Reset Password
          </h3>

          <form className="w-full mt-3 md:mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-4 relative">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                value={formFields.password}
                name="password"
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

            <div className="form-group w-full mb-4 relative">
              <TextField
                type={showConPassword ? "text" : "password"}
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                className="w-full"
                value={formFields.conPassword}
                name="conPassword"
                onChange={onChangeInput}
                disabled={isLoading}
                size="small"
              />
              <Button
                onClick={() => setShowConPassword(!showConPassword)}
                className="!w-[40px] !min-w-[40px] !rounded-full
                  !text-black !bg-transparent
                  !h-[40px] !text-xl !absolute !z-5 !right-1 !top-1 opacity-75 hover:!text-primary !transition"
              >
                {showConPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </Button>
            </div>

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
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
