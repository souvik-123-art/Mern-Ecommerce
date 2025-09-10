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
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import toast from "react-hot-toast";
import { setCartData } from "../../redux/Slices/cartSlice";
import { QtyBox } from "../QtyBox";
import { IoMdClose } from "react-icons/io";
import { setMyListData } from "../../redux/Slices/myListSlice";
import { FaHeart } from "react-icons/fa";

export const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [ramIndex, setRamIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [cartItem, setCartItem] = useState(null);
  const [listItem, setListItem] = useState(null);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartData = useSelector((state) => state.cartData.cartData);
  const myListData = useSelector((state) => state.myListData.myListData);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const dispatch = useDispatch();

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
      productRam: pro?.productRam,
      productSize: pro?.size,
      productWeight: pro?.productWeight,
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
          setSizeIndex(null);
          setRamIndex(null);
          setWeightIndex(null);
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

  const handleAddToMyList = (pro) => {
    if (!isLogin) {
      toast.error("you need to login first");
      return;
    }

    const data = {
      productTitle: pro?.name,
      image: pro?.images[0],
      rating: pro?.rating,
      price: pro?.price,
      oldPrice: pro?.oldPrice,
      brand: pro?.brand,
      discount: pro?.discount,
      productId: pro?._id,
    };

    postData("/api/myList/add", data, { credentials: true }).then((res) => {
      if (!res?.error) {
        toast.success(res?.message);
        fetchDataFromApi("/api/myList").then((response) => {
          if (!response?.error) {
            dispatch(setMyListData(response?.data));
          }
        });
      } else {
        toast.error(res?.message);
      }
    });
  };
  const handleRemoveToMyList = () => {
    if (!isLogin) {
      toast.error("you need to login first");
      return;
    }

    deleteData(`/api/myList/${listItem._id}`, {
      credentials: true,
    }).then((res) => {
      if (!res?.error) {
        toast.success(res?.data?.message);
        fetchDataFromApi("/api/myList").then((response) => {
          if (!response?.error) {
            dispatch(setMyListData(response?.data));
          }
        });
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
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
  useEffect(() => {
    const added = myListData.find((p) => p.productId === props?.data?._id);
    if (added) {
      setIsAddedToList(true);
      setListItem(added);
    } else {
      setIsAddedToList(false);
      setListItem(null);
    }
  }, [myListData]);
  return (
    <div className="productItem rounded-lg md:rounded-xl overflow-hidden border">
      <div className="imgWrapper group relative w-full overflow-hidden">
        <Link to={`/product-details/${props?.data?._id}`}>
          <div className="img h-[150px] sm:h-[180px] md:h-[220px] overflow-hidden">
            <img src={props?.data?.images[0]} className="w-full" alt="" />
            <img
              src={props?.data?.images[1]}
              className="w-full absolute left-0 top-0 group-hover:opacity-100 group-hover:scale-105 opacity-0 transition-all duration-1000"
              alt=""
            />
          </div>
        </Link>
        {isShowTabs && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-2 sm:p-3 gap-1 sm:gap-2">
            {props?.data?.size?.length > 0 && (
              <div className="flex items-center flex-col justify-center gap-2 sm:gap-3 mt-3 sm:mt-5">
                <IoMdClose
                  onClick={() => {
                    setIsShowTabs(false);
                    setSelectedSize("");
                  }}
                  className="ml-auto text-base sm:text-lg text-white link transition"
                />
                <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                  {props?.data?.size?.map((size, idx) => (
                    <Button
                      key={size}
                      onClick={() => {
                        sizeIndex === idx
                          ? setSizeIndex(null)
                          : setSizeIndex(idx);
                        sizeIndex !== idx
                          ? setSelectedSize(size)
                          : setSelectedSize("");
                      }}
                      className={`!w-8 !h-8 sm:!w-10 sm:!h-10 !min-w-0 !rounded-full text-sm sm:text-lg ${
                        sizeIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {props?.data?.productRam?.length > 0 && (
              <div className="flex items-center flex-col justify-center gap-2 sm:gap-3 mt-3 sm:mt-5">
                <IoMdClose
                  onClick={() => {
                    setIsShowTabs(false);

                    setSelectedRam("");
                  }}
                  className="ml-auto text-base sm:text-lg text-white link transition"
                />
                <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                  {props?.data?.productRam?.map((ram, idx) => (
                    <Button
                      key={ram}
                      onClick={() => {
                        ramIndex === idx ? setRamIndex(null) : setRamIndex(idx);
                        ramIndex !== idx
                          ? setSelectedRam(ram)
                          : setSelectedRam("");
                      }}
                      className={`!w-8 !h-8 sm:!w-10 sm:!h-10 !min-w-0 !rounded-full text-sm sm:text-lg ${
                        ramIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white"
                      }`}
                    >
                      {ram}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {props?.data?.productWeight?.length > 0 && (
              <div className="flex items-center flex-col justify-center gap-2 sm:gap-3 mt-3 sm:mt-5">
                <IoMdClose
                  onClick={() => {
                    setIsShowTabs(false);
                    setSelectedWeight("");
                  }}
                  className="ml-auto text-base sm:text-lg text-white link transition"
                />
                <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                  {props?.data?.productWeight?.map((wgt, idx) => (
                    <Button
                      key={wgt}
                      onClick={() => {
                        weightIndex === idx
                          ? setWeightIndex(null)
                          : setWeightIndex(idx);
                        weightIndex !== idx
                          ? setSelectedWeight(wgt)
                          : setSelectedWeight("");
                      }}
                      className={`!w-8 !h-8 sm:!w-10 sm:!h-10 !min-w-0 !rounded-full text-sm sm:text-lg ${
                        weightIndex === idx
                          ? "!bg-primary !text-white"
                          : "!text-gray-700 !bg-white"
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

        <span className="discount absolute top-2 left-2 sm:top-[15px] sm:left-[15px] z-50 bg-primary text-white rounded p-1 sm:p-2 text-[10px] sm:text-[12px] font-[500]">
          {props?.data?.discount}%
        </span>
        <div className="actions group-hover:top-2 sm:group-hover:top-[15px] transition-all duration-500 absolute top-[-200px] right-2 sm:right-[15px] z-50 flex items-center flex-col gap-1 sm:gap-2">
          <Button
            onClick={() => {
              !isAddedToList
                ? handleAddToMyList(props?.data)
                : handleRemoveToMyList();
            }}
            className="!bg-white hover:!bg-primary !min-w-8 h-8 sm:!min-w-10 sm:h-10 hover:!text-white !text-primary !rounded-full"
          >
            {isAddedToList ? (
              <FaHeart className="text-[14px] sm:text-[18px] pointer-events-none " />
            ) : (
              <FaRegHeart className="text-[14px] sm:text-[18px] pointer-events-none " />
            )}
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
            className="!bg-white hover:!bg-primary !min-w-8 h-8 sm:!min-w-10 sm:h-10 hover:!text-white !text-primary !rounded-full"
          >
            <MdZoomOutMap className="text-[14px] sm:text-[18px] pointer-events-none " />
          </Button>
        </div>
      </div>
      <div className="info p-2 sm:p-3 py-3 sm:py-5 bg-[#fafafa]">
        <h6 className="text-[11px] sm:text-[13px] mb-1 text-gray-500">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.brand}
          </Link>
        </h6>
        <h3 className="text-[13px] sm:text-[15px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)] truncate">
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
        <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
          <span className="oldPrice line-through text-gray-500 text-[13px] sm:text-[15px] font-[500]">
            ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[13px] sm:text-[15px] font-[600]">
            ₹{props?.data?.price.toLocaleString("en-IN")}
          </span>
        </div>
        {isAddedToCart ? (
          <div className="flex items-center justify-center mt-2 sm:mt-3">
            <QtyBox
              quantity={quantity}
              setQuantity={setQuantity}
              count={props?.data?.countInStock}
              component={"proItem"}
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
            className="!px-2 sm:!px-4 w-full !py-1 sm:!py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1 !mt-2 sm:!mt-3 text-xs sm:text-base"
          >
            <FaOpencart className="text-lg sm:text-xl" /> Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};
