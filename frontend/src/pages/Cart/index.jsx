import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CartItems } from "./CartItems";
export const Cart = () => {
  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto flex gap-5">
        <div className="leftPart w-[70%]">
          <div className="shadow-md bg-white rounded-md">
            <div className="py-2 px-3 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black/70">Your Cart</h2>
              <p className="mt-2 text-lg mb-6 font-light">
                There are <span className="font-bold text-primary">2 </span>
                Products in your cart
              </p>
            </div>
            <CartItems size={'S'} qty={1}/>
          </div>
        </div>
        <div className="rightPart w-[30%]">
          <div className="shadow-md bg-white rounded-md p-5">
            <h2 className="text-xl font-bold pb-3 text-black/70">
              Cart Totals
            </h2>
            <hr />
            <div className="flex py-2 justify-between items-center">
              <span>Subtotal</span>
              <span className="font-semibold text-primary">$86.00</span>
            </div>
            <div className="flex py-2 justify-between items-center">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex py-2 justify-between items-center">
              <span>Estimate for</span>
              <span className="font-semibold">United Kingdom</span>
            </div>
            <div className="flex py-2 mb-4 border-b border-gray-200 justify-between items-center">
              <span>Total</span>
              <span className="font-semibold text-primary">$86.00</span>
            </div>
            <Link className="block w-full" to="/cart">
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
