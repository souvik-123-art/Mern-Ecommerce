import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CartItems } from "./CartItems";
import { useSelector } from "react-redux";
export const Cart = () => {
  const cartData = useSelector((state) => state.cartData.cartData);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
   useEffect(() => {
      const token = localStorage.getItem("accesstoken");
      if (token === undefined || token === null || token === "") {
        navigate("/");
      }
    }, [userDetails]);
  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-5">
        {/* Left Part - Cart Items */}
        <div className="leftPart w-full lg:w-[70%]">
          <div className="shadow-md bg-white rounded-md">
            <div className="py-2 px-3 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black/70">Your Cart</h2>
              <p className="mt-2 text-lg mb-6 font-light">
                There are{" "}
                <span className="font-bold text-primary">
                  {cartData.length}{" "}
                </span>
                Products in your cart
              </p>
            </div>

            {cartData?.length !== 0 ? (
              cartData?.map((item, idx) => (
                <CartItems key={item._id} data={item} />
              ))
            ) : (
              <div className="w-full h-[500px] flex flex-col items-center justify-center gap-2">
                <img
                  src="/Images/shop.png"
                  className="w-auto h-[200px] opacity-80"
                  alt=""
                />
                <span className="font-bold font-['lexend'] text-4xl text-black/50">
                  Your Cart Is Empty!
                </span>
                <Link to={"/"}>
                  <Button className="!px-4 !mt-4 !mb-6 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Part - Cart Totals */}
        <div className="rightPart w-full lg:w-[30%] mt-5 lg:mt-0">
          <div className="shadow-md bg-white rounded-md p-5 sticky top-20 z-[60]">
            <h2 className="text-xl font-bold pb-3 text-black/70">
              Cart Totals
            </h2>
            <hr />
            <div className="flex py-2 justify-between items-center">
              <span>Subtotal</span>
              <span className="font-semibold text-primary">
                {(cartData?.length !== 0
                  ? cartData
                      ?.map((item) => parseInt(item.subtotal))
                      .reduce((total, value) => total + value, 0)
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
            <div className="flex py-2 justify-between items-center">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex py-2 justify-between items-center">
              <span>Taxes</span>
              <span className="font-semibold text-primary">₹50.00</span>
            </div>
            <div className="flex py-2 justify-between items-center">
              <span>Estimate for</span>
              <span className="font-semibold">United Kingdom</span>
            </div>
            <div className="flex py-2 mb-4 border-b border-gray-200 justify-between items-center">
              <span>Total</span>
              <span className="font-semibold text-primary">
                {(cartData?.length !== 0
                  ? cartData
                      ?.map((item) => parseInt(item.subtotal))
                      .reduce((total, value) => total + value, 0) + 50
                  : 0
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
            <Link className="block w-full" to="/checkout">
              <Button className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
                <MdOutlineShoppingBag className="text-xl" /> Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
