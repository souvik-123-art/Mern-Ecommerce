import React from "react";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import { PhoneInput } from "react-international-phone";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { setAddress } from "../../redux/slices/userAddressSlice";
const AddAddress = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: status,
    selected: false,
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields({
      ...formFields,
      status: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.address_line === "") {
      toast.error("enter your address");
      setIsLoading(false);
      return false;
    }
    if (formFields.city === "") {
      toast.error("enter your city");
      setIsLoading(false);
      return false;
    }
    if (formFields.state === "") {
      toast.error("enter your state");
      setIsLoading(false);
      return false;
    }
    if (formFields.pincode === "") {
      toast.error("enter your pincode");
      setIsLoading(false);
      return false;
    }
    if (formFields.country === "") {
      toast.error("enter your country");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      toast.error("enter your mobile no.");
      setIsLoading(false);
      return false;
    }
    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.error) {
        toast.success(res.message);
        console.log(res);
        setFormFields({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
        });
        setIsLoading(false);
        dispatch(setIsOpenFullScreenPanel({ open: false }));
        fetchDataFromApi("/api/address").then((res) => {
          dispatch(setAddress(res?.data));
        });
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="p-5 bg-gray-50 min-h-screen flex items-center justify-center">
      <form
        className="form p-6 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div className="scroll max-h-[70vh] overflow-y-auto pr-2 sm:pr-4 pt-2 sm:pt-4">
          {/* Address Line */}
          <div className="grid grid-cols-1 mb-3">
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">
                Address Line
              </h3>
              <input
                type="text"
                name="address_line"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md px-3 text-sm"
                onChange={onChangeInput}
                value={formFields.address_line}
              />
            </div>
          </div>

          {/* City, State, Pincode, Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">City</h3>
              <input
                type="text"
                name="city"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md px-3 text-sm"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">State</h3>
              <input
                type="text"
                name="state"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md px-3 text-sm"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">Pincode</h3>
              <input
                type="number"
                name="pincode"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md px-3 text-sm"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">Country</h3>
              <input
                type="text"
                name="country"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md px-3 text-sm"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
          </div>

          {/* Mobile + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div className="w-full">
              <h3 className="text-base sm:text-lg font-medium mb-1">
                Mobile No.
              </h3>
              <PhoneInput
                defaultCountry="in"
                value={String(formFields.mobile)}
                name="mobile"
                disabled={isLoading}
                onChange={(phone) =>
                  setFormFields({
                    ...formFields,
                    mobile: phone,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="!p-3 btn-blue w-full !mt-6 sm:!mt-8 flex items-center justify-center"
        >
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddAddress;
