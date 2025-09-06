import React, { useEffect, useState } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { productModal } from "../../redux/Slices/productModalSlice";
import { QtyBox } from "../QtyBox";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { setCartData } from "../../redux/Slices/cartSlice";
import toast from "react-hot-toast";
import { setMyListData } from "../../redux/Slices/myListSlice";
export const ProductItemListView = (props) => {
  const dispatch = useDispatch();
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
    <div className="productItem overflow-hidden border flex p-3 rounded-md">
      <div className="imgWrapper rounded-md w-[20%] group relative overflow-hidden">
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
            {props?.data?.size?.length > 0 && (
              <div className="flex items-center flex-col justify-center gap-3 mt-5">
                <IoMdClose
                  onClick={() => setIsShowTabs(false)}
                  className=" text-lg text-white link transition"
                />
                <div className="flex gap-2">
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
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
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
              <div className="flex items-center flex-col justify-center gap-3 mt-5">
                <IoMdClose
                  onClick={() => setIsShowTabs(false)}
                  className=" text-lg text-white link transition"
                />
                <div className="flex gap-2">
                  {props?.data?.productRam?.map((ram, idx) => (
                    <Button
                      key={ram}
                      onClick={() => {
                        ramIndex === idx ? setRamIndex(null) : setRamIndex(idx);
                        ramIndex !== idx
                          ? setSelectedRam(ram)
                          : setSelectedRam("");
                      }}
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
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
              <div className="flex items-center flex-col justify-center gap-3 mt-5">
                <IoMdClose
                  onClick={() => setIsShowTabs(false)}
                  className="text-lg text-white link transition"
                />
                <div className="flex gap-2">
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
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
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
        <span className="discount absolute top-[15px] left-[15px] z-50 bg-primary text-white rounded-md p-2 text-[12px] font-[500]">
          {props?.data?.discount}%
        </span>
        <div className="actions group-hover:top-[15px] transition-all duration-500 absolute top-[-200px] right-[15px] z-50 flex items-center flex-col gap-2">
          <Button
            onClick={() => {
              !isAddedToList
                ? handleAddToMyList(props?.data)
                : handleRemoveToMyList();
            }}
            className="!bg-white hover:!bg-primary !min-w-10 h-10 hover:!text-white !text-primary !rounded-full"
          >
            {isAddedToList ? (
              <FaHeart className="text-[18px] pointer-events-none " />
            ) : (
              <FaRegHeart className="text-[18px] pointer-events-none " />
            )}
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
      <div className="info py-3 px-8 w-[80%]">
        <h6 className="text-[15px] mb-2 text-gray-500">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.brand}
          </Link>
        </h6>
        <h3 className="text-[18px] mb-2 title font-[500] text-[rgba(0,0,0,0.8)]">
          <Link
            to={`/product-details/${props?.data?._id}`}
            className="link transition"
          >
            {props?.data?.name}
          </Link>
        </h3>
        <p className="mb-2 text-[14px] text-black/50">
          {props?.data?.description}
        </p>
        <Rating
          name="size-small"
          value={Number(props?.data?.rating)}
          precision={0.5}
          readOnly
          size="medium"
          className="mb-2"
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
            ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[18px] font-[600]">
            ₹{props?.data?.price.toLocaleString("en-IN")}
          </span>
          {isAddedToCart ? (
            <div className="flex items-center justify-center">
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
              className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
            >
              <FaOpencart className="text-xl" /> Add To Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
