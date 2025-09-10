import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setCartData } from "../../redux/Slices/cartSlice";
import toast from "react-hot-toast";

export const CartItems = (props) => {
  const dispatch = useDispatch();

  // selections initial values from props.data
  const [selectedSize, setSelectedSize] = useState(props.data.size || "");
  const [selectedWeight, setSelectedWeight] = useState(props.data.weight || "");
  const [selectedRam, setSelectedRam] = useState(props.data.ram || "");
  const [selectedQty, setSelectedQty] = useState(props.data.quantity || 1);

  // separate menu anchors
  const [anchorElSize, setAnchorElSize] = useState(null);
  const [anchorElRam, setAnchorElRam] = useState(null);
  const [anchorElWeight, setAnchorElWeight] = useState(null);
  const [anchorElQty, setAnchorElQty] = useState(null);

  // ✅ update function
  const updateCart = (updatedValues) => {
    editData(`/api/cart/update-cart/${props?.data?._id}`, {
      size: updatedValues.size ?? selectedSize,
      ram: updatedValues.ram ?? selectedRam,
      weight: updatedValues.weight ?? selectedWeight,
      qty: updatedValues.qty ?? selectedQty,
      subtotal: (updatedValues.qty ?? selectedQty) * props.data.price,
    }).then((res) => {
      if (!res?.error) {
        fetchDataFromApi("/api/cart").then((response) => {
          dispatch(setCartData(response?.data));
        });
      } else {
        toast.error(res?.message);
      }
    });
  };
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
    <div className="cartItem w-full p-3 flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-200 gap-4">
      {/* Product Image */}
      <div className="img w-full sm:w-[10%] rounded-md overflow-hidden flex-shrink-0">
        <Link to={`/product-details/${props?.data?.productId}`}>
          <img src={props?.data?.image} className="w-full" alt="" />
        </Link>
      </div>

      {/* Info Section */}
      <div className="info w-full sm:w-[90%] relative">
        <IoMdClose
          onClick={() => deleteCartItem(props?.data?._id)}
          className="text-xl link transition ml-auto cursor-pointer absolute right-0 top-0 sm:static"
        />
        <span className="text-md font-semibold text-gray-400 block sm:inline">
          {props?.data?.brand}
        </span>
        <h3 className="font-semibold text-lg transition link mt-1 sm:mt-0">
          <Link to={`/product-details/${props?.data?.productId}`}>
            {props?.data?.productTitle}
          </Link>
        </h3>
        <Rating
          name="size-small"
          value={Number(props?.data?.rating)}
          readOnly
          size="small"
          className="mt-1"
        />

        {/* Options */}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Size */}
          {props?.data?.productSize?.length > 0 && (
            <>
              <span
                className="flex items-center justify-center bg-[#f1f1f1] text-xs py-1 px-2 rounded-md cursor-pointer"
                onClick={(e) => setAnchorElSize(e.currentTarget)}
              >
                Size: {selectedSize} &nbsp; <GoTriangleDown />
              </span>
              <Menu
                anchorEl={anchorElSize}
                open={Boolean(anchorElSize)}
                onClose={() => setAnchorElSize(null)}
              >
                {props?.data?.productSize?.map((size) => (
                  <MenuItem
                    key={size}
                    className={`${size === selectedSize && "!text-primary"}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setAnchorElSize(null);
                      updateCart({ size });
                    }}
                  >
                    {size}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Ram */}
          {props?.data?.productRam?.length > 0 && (
            <>
              <span
                className="flex items-center justify-center bg-[#f1f1f1] text-xs py-1 px-2 rounded-md cursor-pointer"
                onClick={(e) => setAnchorElRam(e.currentTarget)}
              >
                Ram: {selectedRam} &nbsp; <GoTriangleDown />
              </span>
              <Menu
                anchorEl={anchorElRam}
                open={Boolean(anchorElRam)}
                onClose={() => setAnchorElRam(null)}
              >
                {props?.data?.productRam?.map((ram) => (
                  <MenuItem
                    key={ram}
                    className={`${ram === selectedRam && "!text-primary"}`}
                    onClick={() => {
                      setSelectedRam(ram);
                      setAnchorElRam(null);
                      updateCart({ ram });
                    }}
                  >
                    {ram}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Weight */}
          {props?.data?.productWeight?.length > 0 && (
            <>
              <span
                className="flex items-center justify-center bg-[#f1f1f1] text-xs py-1 px-2 rounded-md cursor-pointer"
                onClick={(e) => setAnchorElWeight(e.currentTarget)}
              >
                Weight: {selectedWeight} &nbsp; <GoTriangleDown />
              </span>
              <Menu
                anchorEl={anchorElWeight}
                open={Boolean(anchorElWeight)}
                onClose={() => setAnchorElWeight(null)}
              >
                {props?.data?.productWeight?.map((wgt) => (
                  <MenuItem
                    key={wgt}
                    className={`${wgt === selectedWeight && "!text-primary"}`}
                    onClick={() => {
                      setSelectedWeight(wgt);
                      setAnchorElWeight(null);
                      updateCart({ weight: wgt });
                    }}
                  >
                    {wgt}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Qty */}
          <div className="relative">
            <span
              onClick={(e) => setAnchorElQty(e.currentTarget)}
              className="flex items-center justify-center bg-[#f1f1f1] text-xs py-1 px-2 rounded-md cursor-pointer"
            >
              Qty: {selectedQty} &nbsp; <GoTriangleDown />
            </span>
            <Menu
              anchorEl={anchorElQty}
              open={Boolean(anchorElQty)}
              onClose={() => setAnchorElQty(null)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <MenuItem
                  key={qty}
                  className={`${qty === selectedQty && "!text-primary"}`}
                  onClick={() => {
                    setSelectedQty(qty);
                    setAnchorElQty(null);
                    updateCart({ qty });
                  }}
                >
                  {qty}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="price text-primary text-[14px] font-[600]">
            ₹ {props?.data?.price.toLocaleString("en-IN")}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            ₹ {props?.data?.oldPrice.toLocaleString("en-IN")}
          </span>
          <span className="price text-primary text-[14px] font-[600]">
            {props?.data?.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};
