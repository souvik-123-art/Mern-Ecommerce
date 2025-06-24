import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React from 'react'

export const ForgotPassword = () => {
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
          <form className="w-full mt-5">
            <div className="form-group w-full mb-3">
              <TextField
                type="email"
                id="email"
                label="Email Id"
                variant="outlined"
                className="w-full"
              />
            </div>
            <Button className="!px-6 !mt-5 !w-full !block !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all">
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
