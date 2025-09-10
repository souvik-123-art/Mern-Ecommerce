import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData("/api/user/forgot-password", {
      email: email,
      panel: "client",
    }).then((res) => {
      if (res?.success !== false) {
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
    <section className="forgotPass py-6 md:py-10 px-4">
      <div className="container mx-auto max-w-md md:max-w-lg">
        <div className="card shadow-md w-full m-auto rounded-md bg-white p-4 md:p-6 lg:p-8">
          <h3 className="text-center text-xl md:text-2xl font-bold text-gray-700 mb-4">
            Forgot Password
          </h3>

          <p className="text-gray-700 text-sm md:text-base text-center mb-4 md:mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form className="w-full mt-3 md:mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-4">
              <TextField
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Id"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="!px-6 !mt-4 !w-full !flex !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all !h-12"
              variant="contained"
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
