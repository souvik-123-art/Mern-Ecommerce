import React, { useState, useEffect } from "react";
import { AccountSidebar } from "../../components/AccountSidebar";
import { FaPlus } from "react-icons/fa";
import { setIsOpenFullScreenPanel } from "../../redux/Slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setAddress } from "../../redux/slices/userAddressSlice";
import { HiBuildingOffice } from "react-icons/hi2";

import { IoIosCall, IoMdClose, IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const address = useSelector((state) => state.userAddress.address);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const removeAddress = (id) => {
    deleteData(`/api/address/delete/${id}`, {
      withCredentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res?.data.message);
          fetchDataFromApi("/api/address").then((res) => {
            dispatch(setAddress(res?.data));
          });
        } else {
          toast.error(res?.data.message);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [userDetails]);
  return (
    <section className="myAccountSec py-10 w-full">
      <div className="container mx-auto flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-0">
              <h2 className="pb-3 text-2xl font-semibold">My Address</h2>
            </div>
            <hr />
            <div
              className="flex items-center justify-center p-5 border border-dashed border-red-600/30 bg-red-100 hover:bg-red-200 cursor-pointer transition duration-200 rounded-md mb-5"
              onClick={() =>
                dispatch(
                  setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Address",
                  })
                )
              }
            >
              <span className="text-sm text-red-500 font-semibold flex gap-2 items-center">
                {" "}
                <FaPlus />
                Add Address
              </span>
            </div>
            <br />
            {address.map((add) => (
              <label
                key={add._id}
                className="address w-full flex flex-col text-gray-600 border-dashed border-gray-300  gap-4 cursor-pointer bg-[#f1f1f1] p-3 rounded-md mb-2 relative"
              >
                {add.addressType === "Home" ? (
                  <span className="p-2 self-start flex items-center text-sm gap-2 bg-gray-600 text-white rounded-md">
                    <IoMdHome className="text-white" /> {add.addressType}
                  </span>
                ) : (
                  <span className="p-2 self-start flex items-center text-sm gap-2 bg-gray-600 text-white rounded-md">
                    <HiBuildingOffice className="text-white" />{" "}
                    {add.addressType}
                  </span>
                )}

                <span className="text-xl font-semibold text-black/80 flex flex-col gap-4">
                  <span>{userDetails?.name}</span>
                  <span className="text-sm flex items-start gap-1">
                    <IoIosCall className="text-lg" />
                    <span>+{add?.mobile}</span>
                  </span>
                </span>
                <span>
                  {add.address_line}, {add.city},{" "}
                  {add?.landmark && add?.landmark} {add.state}, {add.country},
                  {add.pincode}
                </span>
                <IoMdClose
                  onClick={() => removeAddress(add._id)}
                  className="text-2xl hover:text-red-400 transition absolute z-10 right-3"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
