import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CloseCartPanel } from "../../redux/Slices/cartPanelSlice";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setCartData } from "../../redux/Slices/cartSlice";

export const CartPanel = () => {
  const dispatch = useDispatch();
  const isCartPanelOpen = useSelector((state) => state.cartPanel.cartPanelOpen);
  const cartData = useSelector((state) => state.cartData.cartData);
  const deleteCartItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res?.data?.message);
          fetchDataFromApi("/api/cart").then((response) => {
            dispatch(setCartData(response?.data));
          });
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <Drawer
      open={isCartPanelOpen}
      anchor="right"
      onClose={() => dispatch(CloseCartPanel())}
      PaperProps={{
        sx: {
          width: 350,
        },
      }}
    >
      <div className="p-4 bg-[#f1f1f1] w-full flex justify-between items-center relative">
        <h4>Shopping Cart({cartData.length})</h4>
        <IoMdClose
          className="text-2xl link transition cursor-pointer"
          onClick={() => dispatch(CloseCartPanel())}
        />
      </div>
      <div className="scroll overflow-x-hidden max-h-[400px] w-full overflow-y-scroll py-3 px-4 mb-12 shadow-md">
        {cartData?.length !== 0
          ? cartData?.map((item) => (
              <div
                key={item?._id}
                className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4"
              >
                <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
                  <img src={item?.image} className="w-full" alt="" />
                </div>
                <div className="info w-[75%] pr-2 relative">
                  <h4 className="text-sm truncate font-semibold link transition mb-2">
                    <Link to={`/product-details/${item?.productId}`}>
                      {item?.productTitle}
                    </Link>
                  </h4>
                  <p className="flex flex-col gap-3 text-sm">
                    <span className="flex gap-4">
                      <span>
                        {" "}
                        Qty: <span>{item?.quantity}</span>
                      </span>
                      <span>
                        {item?.size && (
                          <span>
                            Size: <span>{item?.size}</span>
                          </span>
                        )}
                        {item?.ram && (
                          <span>
                            Ram: <span>{item?.ram}</span>
                          </span>
                        )}
                        {item?.weight && (
                          <span>
                            Weight: <span>{item?.weight}</span>
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-primary font-bold">
                      Price :{" "}
                      <span className="font-[400]">
                        ₹{item?.subtotal.toLocaleString("en-IN")}
                      </span>
                    </span>
                  </p>
                  <MdDeleteOutline
                    onClick={() => deleteCartItem(item?._id)}
                    className="absolute link transition text-xl top-0 -right-1 cursor-pointer"
                  />
                </div>
              </div>
            ))
          : "Your Cart Is Empty"}
      </div>
      <div className="bottomsec absolute bottom-0 w-full">
        <div className="bottominfoPrice w-full border-t border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center mb-2">
            <span>{cartData.length} Item</span>
            <span className="font-bold text-primary">
              {(cartData?.length !== 0
                ? cartData
                    ?.map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>
        <div className="bottominfoTax w-full border-t border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center mb-2">
            <span>Total (tax excl.)</span>
            <span className="font-bold text-primary">
              {(cartData?.length !== 0
                ? cartData
                    ?.map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <div className="flex justify-between items-center  mb-2">
            <span>Total (tax incl.)</span>
            <span className="font-bold text-primary">
              {(cartData?.length !== 0
                ? cartData
                    ?.map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0) + 50
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <div className="flex justify-between items-center  mb-2">
            <span>Taxes:</span>
            <span className="font-bold text-primary">₹50.00</span>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <Link className="block w-1/2" to="/cart">
              <Button
                onClick={() => dispatch(CloseCartPanel())}
                className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
              >
                View Cart
              </Button>
            </Link>
            <Link className="block w-1/2" to="/checkout">
              <Button
                onClick={() => dispatch(CloseCartPanel())}
                className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
