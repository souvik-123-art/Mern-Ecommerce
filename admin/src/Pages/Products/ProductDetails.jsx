import React, { useEffect, useState } from "react";
import { ProductZoom } from "../../Components/ProductZoom";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { setProReview } from "../../redux/slices/productsDataSlice";
import { useSelector, useDispatch } from "react-redux";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const proReview = useSelector((state) => state.proData.proReview);
  const [isLoading, setIsLoading] = useState(false);
  const [singleProData, setSingleProData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/get/${id}`).then((res) => {
      if (!res?.error) {
        setSingleProData(res?.product);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews/${id}`).then((response) => {
      dispatch(setProReview(response?.data));
    });
  }, []);
  return (
    <>
      <div className="py-3 flex items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Product Details</h2>
      </div>

      <div className="productDetails flex flex-col lg:flex-row gap-6 relative">
        {/* Left: Product Image / Zoom */}
        <div className="w-full lg:w-[35%]">
          {singleProData?.images?.length !== 0 && (
            <ProductZoom images={singleProData?.images} />
          )}
        </div>

        {/* Loader overlay */}
        <div
          className={`absolute inset-0 bg-[#f1f1f1] ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50`}
        >
          <CircularProgress className="!text-primary" />
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[65%]">
          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl font-semibold text-black/70 mb-2">
            {singleProData?.name}
          </h1>

          {/* Brand + Rating + Reviews */}
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
            <span className="text-gray-500 flex gap-1">
              Brand:
              <span className="font-medium text-black/70">
                {singleProData?.brand}
              </span>
            </span>
            <Rating
              name="size-small"
              value={Number(singleProData?.rating)}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-gray-700">Reviews ({proReview?.length})</span>
          </div>

          {/* Price Section */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="line-through text-gray-500 text-lg sm:text-xl font-medium">
              ₹{singleProData?.oldPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-primary text-lg sm:text-xl font-semibold">
              ₹{singleProData?.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm">
              In Stock:
              <span className="text-green-500 font-semibold ml-1">
                {singleProData?.countInStock} Items
              </span>
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {singleProData?.description}
          </p>

          {/* Size / Ram / Weight */}
          <div className="flex flex-col gap-2 mt-4 text-sm sm:text-base">
            {singleProData?.size?.length !== 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Size:</span>
                {singleProData?.size?.map((size, i, arr) => (
                  <p key={size} className="font-light">
                    {size}
                    {i < arr.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            )}

            {singleProData?.productRam?.length !== 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Ram:</span>
                {singleProData?.productRam?.map((ram, i, arr) => (
                  <p key={ram} className="font-light">
                    {ram}
                    {i < arr.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            )}

            {singleProData?.productWeight?.length !== 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Weight:</span>
                {singleProData?.productWeight?.map((wgt, i, arr) => (
                  <p key={wgt} className="font-light">
                    {wgt}
                    {i < arr.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Review Count */}
          <div className="flex items-center mt-4">
            <span className="font-medium text-base sm:text-lg">
              Reviews:
              <span className="ml-1 font-light">
                ({proReview?.length}) total
              </span>
            </span>
          </div>

          {/* Published Date */}
          <div className="flex items-center mt-2">
            <span className="font-medium text-base sm:text-lg">
              Published:
              <span className="ml-1 font-light">
                {new Date(singleProData?.createdAt).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </span>
          </div>

          {/* Customer Reviews */}
          <div className="w-full mt-6">
            <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
            <div className="scroll w-full max-h-[300px] overflow-y-auto pr-1">
              {proReview?.length !== 0 ? (
                [...proReview].reverse().map((review) => (
                  <div key={review._id} className="w-full mb-3">
                    <article className="border border-gray-200 p-4 rounded-md">
                      <div className="flex items-center mb-3">
                        <img
                          className="w-10 h-10 mr-3 rounded-full object-cover"
                          src={review?.image}
                          alt={review?.userName}
                        />
                        <p className="font-medium text-black/80">
                          {review?.userName}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <Rating
                        name="review-rating"
                        value={Number(review?.rating)}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <p className="mt-2 text-gray-800 text-sm">
                        {review?.review}
                      </p>
                    </article>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Reviews</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
