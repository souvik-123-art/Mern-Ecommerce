import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
import {
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { TbRuler, TbCpu, TbWeight } from "react-icons/tb";

export const ProductItemListView = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartData = useSelector((state) => state.cartData.cartData);
  const myListData = useSelector((state) => state.myListData.myListData);

  const addToCart = (pro, qty) => {
    if (!isLogin) {
      toast.error("You need to login first");
      return;
    }

    if (
      pro?.size?.length ||
      pro?.productRam?.length ||
      pro?.productWeight?.length
    ) {
      if (!selectedSize && !selectedRam && !selectedWeight) {
        setShowOptionsDialog(true);
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
          setShowOptionsDialog(false);
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
      toast.error("You need to login first");
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
      toast.error("You need to login first");
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
    <>
      <div className="product-item-list-view bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-2/5 lg:w-1/3">
            <Link to={`/product-details/${props?.data?._id}`}>
              <div className="aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-4 overflow-hidden relative">
                <img
                  src={props?.data?.images[0]}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500"
                  alt={props?.data?.name}
                />
                <img
                  src={props?.data?.images[1] || props?.data?.images[0]}
                  className="w-full h-48 md:h-56 absolute top-0 left-0 object-cover opacity-0 transition-all duration-500 hover:opacity-100"
                  alt={props?.data?.name}
                />
              </div>
            </Link>

            {props?.data?.discount > 0 && (
              <Chip
                label={`-${props?.data?.discount}%`}
                className="!absolute top-3 left-3 !bg-red-500 !text-white !font-medium !text-xs"
                size="small"
              />
            )}

            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <IconButton
                onClick={() =>
                  !isAddedToList
                    ? handleAddToMyList(props?.data)
                    : handleRemoveToMyList()
                }
                className="!bg-white !shadow-md !text-gray-700 hover:!text-red-500 hover:!bg-white"
                size="small"
              >
                {isAddedToList ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </IconButton>

              <IconButton
                onClick={() =>
                  dispatch(
                    productModal({
                      open: true,
                      id: props?.data?._id,
                    })
                  )
                }
                className="!bg-white !shadow-md !text-gray-700 hover:!text-primary hover:!bg-white"
                size="small"
              >
                <MdZoomOutMap />
              </IconButton>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 p-4 md:p-5">
            <div className="flex flex-col h-full justify-between">
              <div>
                <Link
                  to={`/product-details/${props?.data?._id}`}
                  className="text-xs font-medium text-gray-500 hover:text-primary transition-colors uppercase tracking-wide mb-1"
                >
                  {props?.data?.brand}
                </Link>

                <Link
                  to={`/product-details/${props?.data?._id}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2"
                >
                  {props?.data?.name}
                </Link>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {props?.data?.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Rating
                    name="read-only"
                    value={Number(props?.data?.rating)}
                    readOnly
                    precision={0.1}
                    size="small"
                  />
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  {props?.data?.oldPrice > props?.data?.price && (
                    <span className="text-gray-400 line-through text-sm">
                      ₹{props?.data?.oldPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-xl font-bold text-primary">
                    ₹{props?.data?.price.toLocaleString("en-IN")}
                  </span>

                  {props?.data?.countInStock > 0 ? (
                    <Chip
                      label="In Stock"
                      size="small"
                      className="!bg-green-100 !text-green-800 !text-xs"
                    />
                  ) : (
                    <Chip
                      label="Out of Stock"
                      size="small"
                      className="!bg-red-100 !text-red-800 !text-xs"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {isAddedToCart ? (
                    <div className="flex items-center gap-3">
                      <QtyBox
                        quantity={quantity}
                        setQuantity={setQuantity}
                        count={props?.data?.countInStock}
                        component="proItem"
                        onUpdate={(newQty) =>
                          editData(`/api/cart/update-cart/${cartItem?._id}`, {
                            qty: newQty,
                            subtotal: newQty * cartItem?.price,
                          }).then((res) => {
                            if (!res?.error) {
                              fetchDataFromApi("/api/cart").then((response) => {
                                dispatch(setCartData(response?.data));
                              });
                            }
                          })
                        }
                      />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => addToCart(props?.data, quantity)}
                      className="!bg-primary hover:!bg-primary-dark !text-white !px-4 !py-2 !rounded-lg !normal-case !flex !items-center !gap-2 !shadow-sm"
                      disabled={props?.data?.countInStock === 0}
                    >
                      <FaOpencart className="text-base" />
                      Add To Cart
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/product-details/${props?.data?._id}`}
                    className="!border-gray-300 !text-gray-700 hover:!border-primary hover:!text-primary !normal-case"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Options Selection Dialog */}
      <Dialog
        open={showOptionsDialog}
        onClose={() => setShowOptionsDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="!p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Options
            </h3>
            <IconButton
              onClick={() => {
                setShowOptionsDialog(false);
                setSelectedSize("");
                setSelectedRam("");
                setSelectedWeight("");
              }}
              size="small"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="space-y-6">
            {/* Sizes */}
            {props?.data?.size?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TbRuler className="text-gray-600" />
                  <h4 className="font-medium text-gray-900">Size</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {props?.data?.size.map((size, idx) => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => {
                        sizeIndex === idx
                          ? setSizeIndex(null)
                          : setSizeIndex(idx);
                        sizeIndex !== idx
                          ? setSelectedSize(size)
                          : setSelectedSize("");
                      }}
                      variant={sizeIndex === idx ? "filled" : "outlined"}
                      color={sizeIndex === idx ? "primary" : "default"}
                      className="!cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* RAM Options */}
            {props?.data?.productRam?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TbCpu className="text-gray-600" />
                  <h4 className="font-medium text-gray-900">RAM</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {props?.data?.productRam.map((ram, idx) => (
                    <Chip
                      key={ram}
                      label={ram}
                      onClick={() => {
                        ramIndex === idx ? setRamIndex(null) : setRamIndex(idx);
                        ramIndex !== idx
                          ? setSelectedRam(ram)
                          : setSelectedRam("");
                      }}
                      variant={ramIndex === idx ? "filled" : "outlined"}
                      color={ramIndex === idx ? "primary" : "default"}
                      className="!cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Weight Options */}
            {props?.data?.productWeight?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TbWeight className="text-gray-600" />
                  <h4 className="font-medium text-gray-900">Weight</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {props?.data?.productWeight.map((wgt, idx) => (
                    <Chip
                      key={wgt}
                      label={wgt}
                      onClick={() => {
                        weightIndex === idx
                          ? setWeightIndex(null)
                          : setWeightIndex(idx);
                        weightIndex !== idx
                          ? setSelectedWeight(wgt)
                          : setSelectedWeight("");
                      }}
                      variant={weightIndex === idx ? "filled" : "outlined"}
                      color={weightIndex === idx ? "primary" : "default"}
                      className="!cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outlined"
                onClick={() => setShowOptionsDialog(false)}
                className="!flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => addToCart(props?.data, quantity)}
                className="!flex-1 !bg-primary"
                disabled={!selectedSize && !selectedRam && !selectedWeight}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
