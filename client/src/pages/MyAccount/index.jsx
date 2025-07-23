import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AccountSidebar } from "../../components/AccountSidebar";
export const MyAccount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, []);
  return (
    <section className="myAccountSec py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3 text-2xl font-semibold">My Profile</h2>
            <hr />
            <form className="mt-5">
              <div className="flex items-center gap-5">
                <div className="w-1/2">
                  <TextField
                    label="Full Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mt-4">
                <div className="w-1/2">
                  <TextField
                    label="Mobile No."
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="number"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="!px-6 !mt-5 !block !py-2 !bg-primary !text-white hover:!bg-gray-900 !transition-all !self-center"
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  className="!px-6 !mt-5 !block !py-2 !bg-[#eee] !text-black hover:!opacity-80 !transition-all !self-center"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
