import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { postData } from '../../utils/api'
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom'
export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(localStorage.getItem('userEmail'))
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsLoading(true)
    postData("/api/user/forgot-password", {
      email: email
    }).then((res)=>{
      if (!res.error) {
        setIsLoading(false);
        toast.success(res.message)
        localStorage.removeItem('userEmail')
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    })
  }
  return (
    <section className="login py-10">
      <div className="container mx-auto">
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
}
