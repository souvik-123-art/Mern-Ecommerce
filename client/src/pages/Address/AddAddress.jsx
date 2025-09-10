import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { BsCloudUpload } from "react-icons/bs";
import { PhoneInput } from "react-international-phone";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setIsOpenFullScreenPanel } from "../../redux/Slices/fullScreenPanelSlice";
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
    landmark: "",
    addressType: "",
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
  const handleChangeAddressType = (val) => {
    setFormFields((prev) => ({
      ...prev,
      addressType: val,
    }));
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
    if (formFields.addressType === "") {
      toast.error("select your address type");
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
          status: status,
          selected: false,
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
    <section className="p-5 bg-gray-50 min-h-screen">
      <form className="form p-4 sm:p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[70vh] overflow-y-scroll pr-2 sm:pr-4 pt-4">
          {/* Address Line */}
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

          {/* City, Landmark, State, Pincode, Country, Mobile, Address Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
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
              <h3 className="text-lg font-[500] mb-1">Landmark (optional)</h3>
              <input
                type="text"
                name="landmark"
                className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
                onChange={onChangeInput}
                value={formFields.landmark}
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
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="!text-lg !font-[600] !font-['lexend'] !text-black/90"
                >
                  Address Type
                </FormLabel>
                <RadioGroup
                  onChange={(e, value) => handleChangeAddressType(value)}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="Work"
                    control={<Radio />}
                    label="Work"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="!p-3 btn-blue w-full !mt-8 flex items-center justify-center"
        >
          <BsCloudUpload className="mr-2 text-xl" />
          Publish & View
        </Button>
      </form>
    </section>
  );
};

export default AddAddress;
