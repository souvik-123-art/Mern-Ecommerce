import React from "react";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import { PhoneInput } from "react-international-phone";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { postData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useState } from "react";
import toast from "react-hot-toast";
const AddAddress = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
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
      status: event.target.value
    })
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
        toast.success(res.message)
        console.log(res);
        setFormFields({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: status,
          userId: "",
        });
        setIsLoading(false);
        dispatch(setIsOpenFullScreenPanel({ open: false }))
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="p-5 bg-gray-50 h-[100vh]">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">Address Line</h3>
              <input
                type="text"
                name="address_line"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.address_line}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">City</h3>
              <input
                type="text"
                name="city"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">State</h3>
              <input
                type="text"
                name="state"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">Pincode</h3>
              <input
                type="number"
                name="pincode"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">Country</h3>
              <input
                type="text"
                name="country"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">Mobile No.</h3>
              <PhoneInput
                defaultCountry="in"
                value={String(formFields.mobile)}
                name="mobile"
                disabled={isLoading ? true : false}
                onChange={(phone) => {
                  setFormFields({
                    ...formFields,
                    mobile: phone,
                  });
                }}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-lg font-[500] mb-1">Status</h3>
              <Select
                name="status"
                className="focus:!outline-black/50 !w-full"
                size="small"
                id="status"
                value={status}
                onChange={handleChangeStatus}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>
          {/* <h3 className="text-lg font-[500] mb-2">Category Image</h3>
          <div className="grid grid-cols-7 gap-4">
            
          </div> */}
        </div>
        <Button type="submit" className=" !p-3 btn-blue w-full !mt-8">
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddAddress;
