import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
export const AccountSidebar = () => {
  return (
    <div className="card sticky top-2.5 bg-white shadow-md rounded-md overflow-hidden ">
      <div className="w-full py-3 flex items-center justify-center flex-col">
        <div className="mb-4 group w-[110px] h-[110px] rounded-full overflow-hidden relative">
          <img
            src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F10-Most-Famous-Male-Models-of-All-Time.jpg&w=1200&q=75"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="overlay transition-all duration-200 opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-10 bg-black/40 flex items-center justify-center cursor-pointer">
            <FaCloudUploadAlt className="text-white text-2xl cursor-pointer" />
            <input
              type="file"
              className="absolute inset-0 opacity-0  cursor-pointer"
            />
          </div>
        </div>
        <h4 className="text-2xl font-semibold">Souvik Sarkar</h4>
        <p className="text-sm">example@gmail.com</p>
      </div>
      <ul className=" pb-4 bg-[#f1f1f1] myAccount">
        <li className="w-full">
          <NavLink
            to="/my-account"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Button className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-md !text-black/80">
              <FaRegUser className="text-xl" /> My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/my-orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Button className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-md !text-black/80">
              <LuBox className="text-xl" /> My Orders
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/my-list"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Button className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-md !text-black/80">
              <FaRegHeart className="text-xl" /> My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Button className="!w-full !py-3 !px-5 !flex !items-center !gap-3 !justify-start !text-md !text-black/80">
              <FiLogOut className="text-xl" /> Logout
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
