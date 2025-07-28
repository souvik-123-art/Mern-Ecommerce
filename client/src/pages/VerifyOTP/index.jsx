import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
const VerifyOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const accesstoken = localStorage.getItem("accesstoken");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newCode = [...code];
    // pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationcode = code.join("");
    setIsLoading(true);
    postData("/api/user/verify-email", { code: verificationcode }).then(
      (res) => {
        if (!res?.error) {
          setIsLoading(false);
          toast.success(res.message);
          if (!accesstoken) {
            navigate("/login");
          } else {
            navigate("/my-account");
          }
        } else {
          setIsLoading(false);
          toast.error(res.message);
        }
      }
    );
  };
  // auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);
  return (
    <section className="login py-10">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full max-w-md border rounded-md bg-white">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 ">
              Verify Your Email
            </h2>
            <p className="text-center text-gray-700">
              Enter the 6-digit code sent to your email address for reset your
              password
            </p>
          </div>
          <form className="p-8" onSubmit={handleSubmit}>
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  disabled={isLoading ? true : false}
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                      return;
                    }
                    handleKeyDown(index, e);
                  }}
                  className="w-14 h-14 text-center text-2xl font-bold bg-gray-50
rounded-lg focus:border-primary focus:outline-none
                text-primary
                border
                border-gray-200 mb-8"
                />
              ))}
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
                "Verify OTP"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
