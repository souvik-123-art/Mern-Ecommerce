import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
export const Checkout = () => {
  return (
    <section className="checkoutPage py-10">
      <div className="container mx-auto flex gap-5">
        <div className="leftCol w-[70%]">
          <div className="card bg-white rounded-md shadow-md p-5 w-full">
            <h1 className="text-2xl font-bold text-gray-700">
              Billing Details{" "}
            </h1>
            <form className="w-full mt-5">
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="text"
                    label="Full Name"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="text"
                    label="Country"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
              <h6 className="text-md font-semibold mb-2">Street Address *</h6>
              <div className="flex flex-col items-center gap-5 pb-5">
                <div className="col w-full">
                  <TextField
                    size="small"
                    type="text"
                    label="House No. and Street Name"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="col w-full">
                  <TextField
                    size="small"
                    type="text"
                    label="Apartment, suite, unit, etc. (optional)"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="text"
                    label="City"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="text"
                    label="State"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
              <h6 className="text-md font-semibold mb-2">Postcode / ZIP *</h6>
              <div className="flex flex-col items-center gap-5 pb-5">
                <div className="col w-full">
                  <TextField
                    size="small"
                    type="text"
                    label="ZIP Code"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="text"
                    label="Mobile No."
                    variant="outlined"
                    className="w-full"
                  />
                </div>
                <div className="col w-1/2">
                  <TextField
                    size="small"
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="rightCol w-[30%]">
          <div className="shadow-md bg-white rounded-md p-5">
            <h2 className="text-xl font-bold pb-3 text-black/70">YOUR ORDER</h2>
            <hr />
            <div className="flex px-2 text-gray-600 py-3 justify-between items-center">
              <span className="font-semibold">Product</span>
              <span className="font-semibold">Subtotal</span>
            </div>
            <hr />
            <div className="scroll overflow-x-hidden overflow-y-scroll max-h-[250px] pr-2">
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border ">
                    <img
                      src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-sm">Woven Design Georg Kan...</h4>
                    <span className="text-xs">Qty. 1</span>
                  </div>
                </div>
                <span className="font-semibold text-sm">$1300.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border ">
                    <img
                      src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-sm">Woven Design Georg Kan...</h4>
                    <span className="text-xs">Qty. 1</span>
                  </div>
                </div>
                <span className="font-semibold text-sm">$1300.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border ">
                    <img
                      src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-sm">Woven Design Georg Kan...</h4>
                    <span className="text-xs">Qty. 1</span>
                  </div>
                </div>
                <span className="font-semibold text-sm">$1300.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border ">
                    <img
                      src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-sm">Woven Design Georg Kan...</h4>
                    <span className="text-xs">Qty. 1</span>
                  </div>
                </div>
                <span className="font-semibold text-sm">$1300.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[50px] h-[50px] overflow-hidden rounded-md border ">
                    <img
                      src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-sm">Woven Design Georg Kan...</h4>
                    <span className="text-xs">Qty. 1</span>
                  </div>
                </div>
                <span className="font-semibold text-sm">$1300.00</span>
              </div>
            </div>
            <hr className="my-4" />
            <Link className="block w-full" to="/cart">
              <Button className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
                <BsFillBagCheckFill className="text-lg" /> Place Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
