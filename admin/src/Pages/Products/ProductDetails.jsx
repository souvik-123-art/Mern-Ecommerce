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
      <div className="py-3 flex items-center mb-8">
        <h2 className="text-3xl font-bold">Products Details</h2>
      </div>
      <div className="productDetails flex flex-col md:flex-row gap-5 relative">
        <div className="md:w-[30%] w-full">
          {singleProData?.images?.length !== 0 && (
            <ProductZoom images={singleProData?.images} />
          )}
        </div>
        <div
          className={`absolute inset-0 bg-[#f1f1f1] ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50 left-0 top-0`}
        >
          <CircularProgress className="!text-primary" />
        </div>
        <div className="md:w-[70%] w-full">
          <h1 className="text-[22px] font-[600] text-[rgba(0,0,0,0.7)] mb-2">
            {singleProData?.name}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 flex gap-2">
              Brands:
              <span className="font-[500] text-[rgba(0,0,0,0.7)]">
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
            <span className="text-sm text-gray-700">
              Reviews ({proReview?.length})
            </span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
              ₹{singleProData?.oldPrice.toLocaleString("en-IN")}
            </span>
            <span className="price text-primary text-[20px] font-[600]">
              ₹{singleProData?.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm">
              Available In Stock:&nbsp;&nbsp;
              <span className="text-green-500 font-semibold">
                {singleProData?.countInStock} Items
              </span>
            </span>
          </div>
          <p className="mt-4 text-gray-400 text-lg leading-loose">
            {singleProData?.description}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm">
              {singleProData?.size?.length !== 0 && (
                <span className="flex items-center gap-2 text-lg">
                  Size:
                  {singleProData?.size?.map((size, index, array) => (
                    <p className="font-light" key={size}>
                      {size}
                      {index < array.length - 1 ? "," : ""}{" "}
                    </p>
                  ))}
                </span>
              )}
              {singleProData?.productRam?.length !== 0 && (
                <span className="flex items-center gap-2 text-lg">
                  {" "}
                  Ram:
                  {singleProData?.productRam?.map((ram, index, array) => (
                    <p className="font-light" key={ram}>
                      {ram}
                      {index < array.length - 1 ? "," : ""}{" "}
                    </p>
                  ))}
                </span>
              )}
              {singleProData?.productWeight?.length !== 0 && (
                <span className="flex items-center gap-2 text-lg">
                  {" "}
                  Weight:
                  {singleProData?.productWeight?.map((weight, index, array) => (
                    <p className="font-light" key={weight}>
                      {weight}
                      {index < array.length - 1 ? "," : ""}{" "}
                    </p>
                  ))}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center py-1 mt-3">
            <span className="font-[500] flex items-center gap-2 text-lg">
              Review:
              <span className="text-lg font-light">
                ({proReview?.length}) Reviews
              </span>
            </span>
          </div>
          <div className="flex items-center py-1 mt-3">
            <span className="font-[500] flex items-center gap-2 text-lg">
              Published:
              <span className="text-lg font-light">
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
          <div className="w-full proReviewContainer">
            <h2 className="text-lg font-semibold mt-4 mb-6">
              Customer Reviews
            </h2>
            <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
              {proReview?.length !== 0
                ? [...proReview].reverse().map((review) => (
                    <div key={review._id} className="review w-full mb-3">
                      <article className="border border-gray-200 p-5 rounded-md">
                        <div class="flex items-center mb-4">
                          <img
                            class="w-10 h-10 me-4 rounded-full"
                            src={review?.image}
                            alt=""
                          />
                          <div class="font-medium text-black/80">
                            <p>{review?.userName}</p>
                          </div>
                        </div>
                        <div class="mb-3 text-sm text-gray-800">
                          <p className="mb-2">
                            <time datetime={review.createdAt}>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          </p>
                          <Rating
                            name="size-small"
                            value={Number(review?.rating)}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                        </div>
                        <p class="mb-2 text-gray-800">{review?.review}</p>
                      </article>
                    </div>
                  ))
                : "No Reviews "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
