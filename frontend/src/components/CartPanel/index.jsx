import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CloseCartPanel } from "../../redux/Slices/cartPanelSlice";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export const CartPanel = () => {
  const dispatch = useDispatch();
  const isCartPanelOpen = useSelector((state) => state.cartPanel.cartPanelOpen);
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
        <h4>Shopping Cart(1)</h4>
        <IoMdClose
          className="text-2xl link transition cursor-pointer"
          onClick={() => dispatch(CloseCartPanel())}
        />
      </div>
      <div className="scroll overflow-x-hidden max-h-[400px] w-full overflow-y-scroll py-3 px-4 mb-12 shadow-md">
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
        <div className="cartItem w-full flex border-b border-gray-200 pb-3 mb-3  gap-4">
          <div className="img border border-gray-200 w-[25%] overflow-hidden rounded-md h-[80px]">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
              className="w-full"
              alt=""
            />
          </div>
          <div className="info w-[75%] pr-2 relative">
            <h4 className="text-sm font-semibold link transition mb-2">
              <Link to="/product/43435">
                A-Line Kurti With Sharara & Dupatta
              </Link>
            </h4>
            <p className="flex items-center gap-5 text-sm">
              <span>
                Qty: <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdDeleteOutline className="absolute link transition text-xl top-0 -right-1 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="bottomsec absolute bottom-0 w-full">
        <div className="bottominfoPrice w-full border-t border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center mb-2">
            <span>1 Item</span>
            <span className="font-bold text-primary">$86.00</span>
          </div>
          <div className="flex justify-between items-center  mb-2">
            <span>Shipping</span>
            <span className="font-bold text-primary">$8.00</span>
          </div>
          <div className="flex justify-between items-center"></div>
        </div>
        <div className="bottominfoTax w-full border-t border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center mb-2">
            <span>Total (tax excl.)</span>
            <span className="font-bold text-primary">$86.00</span>
          </div>
          <div className="flex justify-between items-center  mb-2">
            <span>Total (tax incl.)</span>
            <span className="font-bold text-primary">$8.00</span>
          </div>
          <div className="flex justify-between items-center  mb-2">
            <span>Taxes:</span>
            <span className="font-bold text-primary">$8.00</span>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <Link className="block w-1/2" to='/cart'>
              <Button  onClick={() => dispatch(CloseCartPanel())} className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
                View Cart
              </Button>
            </Link>
            <Link className="block w-1/2" to='/checkout'>
              <Button  onClick={() => dispatch(CloseCartPanel())} className="!px-4 !w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
