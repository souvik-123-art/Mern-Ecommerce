import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { SiRazorpay } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCall, IoMdHome } from "react-icons/io";
import { HiBuildingOffice } from "react-icons/hi2";
import { GiPayMoney } from "react-icons/gi";
import Radio from "@mui/material/Radio";
import { deleteData, postData, fetchDataFromApi } from "../../utils/api";
import { setCartData } from "../../redux/Slices/cartSlice";
import { setOrderData } from "../../redux/Slices/orderSlice";
import toast from "react-hot-toast";
import OrderSuccessPopup from "../../components/afterPayment/OrderSuccessPopup";
import OrderFailedPopup from "../../components/afterPayment/OrderFailedPopup";
const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const VITE_RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;
export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cartData.cartData);
  const address = useSelector((state) => state.userAddress.address);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const [isChecked, setIsChecked] = useState(null);
  const [selectedAdd, setSelectedAdd] = useState("");
  const [totalAmt, setTotalAmt] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [failedPopupOpen, setFailedPopupOpen] = useState(false);
  const handleOrderSuccess = () => {
    setSuccessPopupOpen(true);
  };

  const handleOrderFailed = () => {
    setFailedPopupOpen(true);
  };
  const handleChange = (e, idx) => {
    if (e.target.checked) {
      setIsChecked(idx);
      setSelectedAdd(e.target.value);
    }
  };
  const checkout = (e) => {
    e.preventDefault();
    if (!selectedAdd) {
      toast.error("Please select a delivery address!");
      return;
    }
    if (totalAmt === 0) {
      toast.error("There Is No Product For Purchase");
      return;
    }
    const options = {
      key: VITE_RAZORPAY_KEY_ID,
      key_secret: VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmt * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + userDetails?.name,
      name: "RYMO",
      description: "Test Transaction",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        const payload = {
          products: cartData,
          paymentId,
          payment_status: "COMPLETED",
          delivery_address: selectedAdd,
          totalAmt,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };

        postData(`/api/order/create`, payload).then((res) => {
          handleOrderSuccess();
          if (!res?.error) {
            deleteData(`/api/cart/empty-cart`).then((res) => {
              fetchDataFromApi("/api/cart").then((response2) => {
                dispatch(setCartData(response2?.data));
              });
              fetchDataFromApi("/api/order").then((response3) => {
                dispatch(setOrderData(response3?.data));
              });
            });
          } else {
            handleOrderFailed();
          }
        });
      },
      modal: {
        ondismiss: function () {
          handleOrderFailed(); // Called when user closes the Razorpay modal without payment
        },
      },
      theme: {
        color: "#ff5252",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };
  const cashOnDelivery = (e) => {
    e.preventDefault();
    if (!selectedAdd) {
      toast.error("Please select a delivery address!");
      return;
    }
    if (totalAmt === 0) {
      toast.error("There Is No Product For Purchase");
      return;
    }
    const payload = {
      products: cartData,
      paymentId: "",
      payment_status: "CASH ON DELIVERY",
      delivery_address: selectedAdd,
      totalAmt,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    postData(`/api/order/create`, payload).then((res) => {
      handleOrderSuccess();
      if (!res?.error) {
        deleteData(`/api/cart/empty-cart`).then((res) => {
          fetchDataFromApi("/api/cart").then((response2) => {
            dispatch(setCartData(response2?.data));
          });
        });
      } else {
        handleOrderFailed();
      }
    });
  };

  useEffect(() => {
    setTotalAmt(
      cartData?.length !== 0
        ? cartData
            .map((item) => parseInt(item?.subtotal))
            .reduce((total, val) => total + val, 0) +
            50 +
            3
        : 0
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });
  }, [cartData]);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [userDetails]);
  return (
    <section className="checkoutPage py-10">
      <OrderSuccessPopup open={successPopupOpen} />
      <OrderFailedPopup
        open={failedPopupOpen}
        onClose={() => setFailedPopupOpen(false)}
      />
      <div className="container mx-auto">
        <form onSubmit={checkout} className="flex flex-col lg:flex-row gap-5">
          {/* Left Column: Address */}
          <div className="leftCol w-full lg:w-[70%]">
            <div className="card bg-white rounded-md shadow-md p-5 w-full">
              <h1 className="text-2xl font-bold text-gray-700 mb-5">
                Select Delivery Address
              </h1>
              {address.map((add, idx) => (
                <label
                  key={add?._id}
                  className={`address w-full flex flex-col text-gray-600 border-dashed border border-gray-300 gap-4 cursor-pointer ${
                    isChecked === idx && "bg-[#f1f1f1]"
                  } p-3 rounded-md mb-2 relative`}
                >
                  <Radio
                    checked={isChecked === idx}
                    value={add?._id}
                    onChange={(e) => handleChange(e, idx)}
                    className="!absolute !right-0 !top-0"
                  />
                  <span className="p-2 self-start flex items-center text-sm gap-2 bg-gray-600 text-white rounded-md">
                    {add.addressType === "Home" ? (
                      <IoMdHome className="text-white" />
                    ) : (
                      <HiBuildingOffice className="text-white" />
                    )}{" "}
                    {add?.addressType}
                  </span>
                  <span className="text-xl font-semibold text-black/80 flex flex-col gap-2">
                    <span>{userDetails?.name}</span>
                    <span className="text-sm flex items-start gap-1">
                      <IoIosCall className="text-lg" /> +{add?.mobile}
                    </span>
                  </span>
                  <span className="text-sm break-words">
                    {add?.address_line}, {add?.city},{" "}
                    {add?.landmark && add?.landmark} {add?.state},{" "}
                    {add?.country}, {add?.pincode}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="rightCol w-full lg:w-[30%] mt-5 lg:mt-0">
            <div className="shadow-md bg-white rounded-md p-5">
              <h2 className="text-xl font-bold pb-3 text-black/70">
                YOUR ORDER
              </h2>
              <hr />
              <div className="flex px-2 text-gray-600 py-3 justify-between items-center">
                <span className="font-semibold">Product</span>
                <span className="font-semibold">Subtotal</span>
              </div>
              <hr />
              <div className="scroll overflow-x-hidden overflow-y-auto max-h-[250px] pr-2 mt-2">
                {cartData?.length !== 0 &&
                  cartData?.map((item) => (
                    <div
                      key={item?._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2"
                    >
                      <div className="part1 flex items-center gap-3 w-full sm:w-[70%]">
                        <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border flex-shrink-0">
                          <img
                            src={item?.image}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div className="info w-full">
                          <p className="text-sm font-medium truncate max-w-[150px]">
                            {item?.productTitle}
                          </p>
                          <span className="text-xs text-gray-500">
                            Qty. {item?.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-semibold text-sm mt-2 sm:mt-0 flex-shrink-0">
                        ₹ {item?.subtotal.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  ))}

                {/* Totals */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Taxes:</span>
                    <span className="font-bold text-primary">₹50.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Platform Fee:</span>
                    <span className="font-bold text-primary">₹3.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Total (tax excl.)</span>
                    <span className="font-bold text-primary">
                      {(cartData?.length !== 0
                        ? cartData
                            ?.map((item) => parseInt(item.subtotal))
                            .reduce((total, value) => total + value, 0)
                        : 0
                      )?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Total</span>
                    <span className="font-bold text-primary">
                      {(cartData?.length !== 0
                        ? cartData
                            ?.map((item) => parseInt(item.subtotal))
                            .reduce((total, value) => total + value, 0) +
                          50 +
                          3
                        : 0
                      )?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <Button
                type="submit"
                className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
              >
                <SiRazorpay className="text-lg" /> Pay With RazorPay
              </Button>
              <Button
                onClick={cashOnDelivery}
                className="!px-4 !mt-3 !w-full !py-2 !text-white !transition hover:!bg-gray-900 !bg-gray-700 flex items-center gap-1"
              >
                <GiPayMoney className="text-lg" /> Cash On Delivery
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
