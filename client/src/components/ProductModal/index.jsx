import React, { useState } from "react";
import { ProductZoom } from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import { QtyBox } from "../../components/QtyBox";
import { FaOpencart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSelector, useDispatch } from "react-redux";
import { closeProductModal } from "../../redux/Slices/productModalSlice";
import { IoMdClose } from "react-icons/io";
export default function ProductModal() {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.proModal.productModalOpen);
  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeProductModal())}
      maxWidth="lg"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="!relative bg-white !p-6 sm:!p-10">
        <Button
          className="!absolute !top-4 !right-4 !w-10 !min-w-10 !h-10 !rounded-full !text-2xl !text-black/80 z-10"
          onClick={() => dispatch(closeProductModal())}
        >
          <IoMdClose />
        </Button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[40%] overflow-hidden">
            <ProductZoom />
          </div>
          <div className="w-full lg:w-[60%] flex flex-col justify-center px-2 sm:px-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 leading-snug">
              AKHILAM Women's Woven Design Georgette Kanjeevaram Saree With
              Unstitched Blouse Piece
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <span>
                Brands:{" "}
                <span className="font-medium text-gray-800">Koskii</span>
              </span>
              <Rating
                name="size-small"
                defaultValue={4}
                readOnly
                size="small"
              />
              <span className="text-xs text-gray-600">(5 reviews)</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="line-through text-gray-400 text-lg font-medium">
                $58.00
              </span>
              <span className="text-primary text-xl font-bold">$58.00</span>
              <span className="text-sm">
                Available:&nbsp;
                <span className="text-green-600 font-semibold">147 Items</span>
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates eum dolorem quibusdam. Excepturi praesentium culpa quo,
              mollitia assumenda, quam ullam aperiam illo et vero inventore.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <span className="text-sm font-medium">Size:</span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size, idx) => (
                  <Button
                    key={size}
                    onClick={() => setProductActionIndex(idx)}
                    className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                      productActionIndex === idx
                        ? "!bg-primary !text-white"
                        : "!text-gray-700"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-sm mt-4 mb-2 text-gray-500">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>

            <div className="flex items-center mt-2 mb-6 gap-4 flex-wrap">
              <QtyBox />
              <Button className="!px-6 !py-2 !bg-primary !text-white hover:!bg-gray-900 transition-all flex items-center gap-2">
                <FaOpencart className="text-xl" /> Add To Cart
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
                <FaRegHeart className="text-lg" /> Add To Wishlist
              </span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
                <GoGitCompare className="text-lg" /> Add To Compare
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
