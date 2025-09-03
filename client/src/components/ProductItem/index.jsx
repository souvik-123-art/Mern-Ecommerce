import React, { useEffect, useState } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";
import { productModal } from "../../redux/Slices/productModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { setCartData } from "../../redux/Slices/cartSlice";
import { QtyBox } from "../QtyBox";
export const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [cartItem, setCartItem] = useState(null);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartData = useSelector((state) => state.cartData.cartData);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const added = cartData.find((p) => p.productId === props?.data?._id);
    if (added) {
      setIsAddedToCart(true);
      setCartItem(added);
      setQuantity(added.quantity);
    } else {
      setIsAddedToCart(false);
      setCartItem(null);
      setQuantity(1);
      setSelectedSize("");
      setSelectedRam("");
      setSelectedWeight("");
    }
  }, [cartData]);

  const addToCart = (pro, qty) => {
    if (!isLogin) {
      toast.error("you need to login first");
      return;
    }

    if (
      pro?.size?.length ||
      pro?.productRam?.length ||
      pro?.productWeight?.length
    ) {
      if (!selectedSize && !selectedRam && !selectedWeight) {
        setIsShowTabs(true);
        return;
      }
    }

    const data = {
      productTitle: pro?.name,
      image: pro?.images[0],
      rating: pro?.rating,
      countInStock: pro?.countInStock,
      price: pro?.price,
      oldPrice: pro?.oldPrice,
      qty: qty,
      subtotal: parseInt(pro?.price) * qty,
      productId: pro?._id,
      brand: pro?.brand,
      discount: pro?.discount,
      size: selectedSize,
      ram: selectedRam,
      weight: selectedWeight,
    };

    postData("/api/cart/add", data, { credentials: true }).then((res) => {
      try {
        if (!res?.error) {
          toast.success(res?.message);
          fetchDataFromApi("/api/cart").then((response) => {
            dispatch(setCartData(response?.data));
          });

          // reset states
          setIsShowTabs(false);
          setProductActionIndex(null);
          setSelectedSize("");
          setSelectedRam("");
          setSelectedWeight("");
          setQuantity(1);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="productItem rounded-xl overflow-hidden border">
      <div className="imgWrapper group relative w-full overflow-hidden">
        <Link to={`/product-details/${props?.data?._id}`}>
          <div className="img h-[220px] overflow-hidden">
            <img src={props?.data?.images[0]} className="w-full" alt="" />
            <img
              src={props?.data?.images[1]}
              className="w-full absolute left-0 top-0 group-hover:opacity-100 group-hover:scale-105 opacity-0 transition-all duration-1000"
              alt=""
            />
          </div>
        </Link>
        {isShowTabs && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2">
            {props?.data?.size?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <div className="flex gap-2">
                  {props?.data?.size?.map((size, idx) => (
                    <Button
                      key={size}
                      onClick={() => {
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx);

                        setSelectedSize(size);
                      }}
                      onDoubleClickCapture={() => setProductActionIndex(null)}
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                        productActionIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white/80"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {props?.data?.productRam?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <div className="flex gap-2">
                  {props?.data?.productRam?.map((ram, idx) => (
                    <Button
                      key={ram}
                      onClick={() => {
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx);

                        setSelectedRam(ram);
                      }}
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                        productActionIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white/80"
                      }`}
                    >
                      {ram}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {props?.data?.productWeight?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <div className="flex gap-2">
                  {props?.data?.productWeight?.map((wgt, idx) => (
                    <Button
                      key={wgt}
                      onClick={() => {
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx);

                        setSelectedWeight(wgt);
                      }}
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                        productActionIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white/80"
                      }`}
                    >
                      {wgt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <span className="discount absolute top-[15px] left-[15px] z-50 bg-primary text-white rounded-md p-2 text-[12px] font-[500]">
          {props?.data?.discount}%
        </span>
        <div className="actions group-hover:top-[15px] transition-all duration-500 absolute top-[-200px] right-[15px] z-50 flex items-center flex-col gap-2">
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <FaRegHeart className="text-[18px] pointer-events-none " />
          </Button>
          <Button className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full">
            <GoGitCompare className="text-[18px] pointer-events-none " />
          </Button>
          <Button
            onClick={() =>
              dispatch(
                productModal({
                  open: true,
                  id: props?.data?._id,
                })
              )
            }
            className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full"
          >
            <MdZoomOutMap className="text-[18px] pointer-events-none " />
          </Button>
        </div>
      </div>
      <div className="info p-3 py-5 bg-[#fafafa]">
        <h6 className="text-[13px] mb-1 text-gray-500">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.brand}
          </Link>
        </h6>
        <h3 className="text-[15px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)] truncate">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.name}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={Number(props?.data?.rating)}
          precision={0.5}
          readOnly
          size="small"
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[15px] font-[600]">
            ₹{props?.data?.price.toLocaleString("en-IN")}
          </span>
        </div>
        {isAddedToCart ? (
          <div className="flex items-center justify-center mt-3">
            <QtyBox
              quantity={quantity}
              setQuantity={setQuantity}
              count={props?.data?.countInStock}
              onUpdate={(newQty) => {
                editData(`/api/cart/update-cart/${cartItem?._id}`, {
                  qty: newQty,
                  subtotal: newQty * cartItem?.price,
                }).then((res) => {
                  if (!res?.error) {
                    fetchDataFromApi("/api/cart").then((response) => {
                      dispatch(setCartData(response?.data));
                    });
                  }
                });
              }}
            />
          </div>
        ) : (
          <Button
            onClick={() => addToCart(props?.data, quantity)}
            className="!px-4 w-full !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1 !mt-3"
          >
            <FaOpencart className="text-xl" /> Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};
