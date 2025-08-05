import React, { useState, useEffect } from "react";
import { AccountSidebar } from "../../components/AccountSidebar";
import { FaPlus } from "react-icons/fa";
import { setIsOpenFullScreenPanel } from "../../redux/Slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setAddress } from "../../redux/slices/userAddressSlice";
import { IoMdClose } from "react-icons/io";
const Address = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.userAddress.address);
  useEffect(() => {
    fetchDataFromApi("/api/address").then((res) => {
      dispatch(setAddress(res?.data));
    });
  }, []);
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
                className="address w-full flex text-gray-600 items-center justify-center cursor-pointer bg-[#f1f1f1] p-3 rounded-md mb-2 relative"
              >
                {/* <Radio
                            checked={selectedValue === add._id}
                            onChange={handleChangeAddress}
                            value={add._id}
                            {...label}
                            size="small"
                          /> */}
                <span>
                  {add.address_line}, {add.city}, {add.state}, {add.country},
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
