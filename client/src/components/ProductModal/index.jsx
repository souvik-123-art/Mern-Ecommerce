import React, { useEffect, useState } from "react";
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
import { productModal } from "../../redux/Slices/productModalSlice";
import { IoMdClose } from "react-icons/io";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import { setProData } from "../../redux/Slices/productsDataSlice";
import { setCartData } from "../../redux/Slices/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
export default function ProductModal() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.cartData);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [ramIndex, setRamIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [proData, setProData] = useState([]);
  const isOpen = useSelector((state) => state.proModal.productModalOpen.open);
  const id = useSelector((state) => state.proModal.productModalOpen.id);
  const proReview = useSelector((state) => state.proData.proReview);

  const addToCart = (pro, qty) => {
    if (!isLogin) {
      toast.error("you need to login first");
      return;
    }
    if (pro.size.length && !selectedSize) {
      toast.error("you need to select size first");
      return;
    }
    if (pro.productRam.length && !selectedRam) {
      toast.error("you need to select ram first");
      return;
    }
    if (pro.productWeight.length && !selectedWeight) {
      toast.error("you need to select weight first");
      return;
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

  const deleteCartItem = () => {
    const added = cartData.find((p) => p.productId === proData._id);

    deleteData(`/api/cart/delete-cart-item/${added._id}`).then((res) => {
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
  useEffect(() => {
    if (isOpen) {
      fetchDataFromApi(`/api/product/get/${id}`).then((res) => {
        setProData(res?.product);
      });
    }
  }, [isOpen, id]);
  useEffect(() => {
    fetchDataFromApi("/api/cart").then((response) => {
      dispatch(setCartData(response?.data));
    });
    const added = cartData.find((p) => p.productId === proData?._id);
    if (added) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartData]);
  return (
    <Dialog
      open={isOpen}
      onClose={() =>
        dispatch(
          productModal({
            open: false,
            id: "",
          })
        )
      }
      maxWidth="lg"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="!relative bg-white !p-6 sm:!p-10">
        <Button
          className="!absolute !top-4 !right-4 !w-10 !min-w-10 !h-10 !rounded-full !text-2xl !text-black/80 z-10"
          onClick={() => {
            dispatch(
              productModal({
                open: false,
                id: "",
              })
            );
            setSizeIndex(null);
            setRamIndex(null);
            setWeightIndex(null);
          }}
        >
          <IoMdClose />
        </Button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[40%] overflow-hidden">
            <ProductZoom data={proData?.images} />
          </div>
          <div className="w-full lg:w-[60%] flex flex-col justify-center px-2 sm:px-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 leading-snug">
              {proData?.name}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <span>
                Brands:{" "}
                <span className="font-medium text-gray-800">
                  {proData?.brand}
                </span>
              </span>
              <Rating
                name="size-small"
                value={Number(proData?.rating)}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="line-through text-gray-400 text-lg font-medium">
                ₹{proData?.oldPrice}
              </span>
              <span className="text-primary text-xl font-bold">
                ₹{proData?.price}
              </span>
              <span className="text-sm">
                Available:&nbsp;
                <span className="text-green-600 font-semibold">
                  {proData?.countInStock} Items
                </span>
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {proData?.description}
            </p>
            {proData?.size?.length > 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Size:</span>
                <div className="flex gap-2">
                  {proData?.size?.map((size, idx) => (
                    <Button
                      disabled={isAddedToCart}
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
                          : "!text-gray-700"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {proData?.productRam?.length > 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Ram:</span>
                <div className="flex gap-2">
                  {proData?.productRam?.map((ram, idx) => (
                    <Button
                      disabled={isAddedToCart}
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
                          : "!text-gray-700"
                      }`}
                    >
                      {ram}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {proData?.productWeight?.length > 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Weight:</span>
                <div className="flex gap-2">
                  {proData?.productWeight?.map((wgt, idx) => (
                    <Button
                      key={wgt}
                      disabled={isAddedToCart}
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
                          : "!text-gray-700"
                      }`}
                    >
                      {wgt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm mt-4 mb-2 text-gray-500">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>

            <div className="flex items-center mt-2 mb-6 gap-4 flex-wrap">
              <QtyBox
                count={proData?.countInStock}
                quantity={quantity}
                setQuantity={setQuantity}
                component={"proDetails"}
              />
              {isAddedToCart ? (
                <div className="flex items-center gap-4 mt-5">
                  <Link to={"/cart"}>
                    <Button
                      onClick={() => {
                        dispatch(
                          productModal({
                            open: false,
                            id: "",
                          })
                        );
                      }}
                      className="!px-4 !ml-1 !mb-6 !py-2 !bg-green-500 !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
                    >
                      <BsBag className="text-xl" /> View In Cart
                    </Button>
                  </Link>

                  <Button
                    onClick={deleteCartItem}
                    className="!px-4 !ml-1 !mb-6 !py-2 !bg-red-500 !text-white !transition hover:!opacity-80 flex items-center gap-1"
                  >
                    <MdDeleteOutline className="text-xl" /> Remove From Cart
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => addToCart(proData, quantity)}
                  className="!px-4 !mt-5 !ml-1 !mb-6 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1"
                >
                  <FaOpencart className="text-xl" /> Add To Cart
                </Button>
              )}
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
