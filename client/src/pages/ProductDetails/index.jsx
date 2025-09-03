import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductZoom } from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { QtyBox } from "../../components/QtyBox";
import { FaOpencart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { ProductSlider } from "../../components/ProductSlider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../../../admin/src/utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Reviews from "../../components/Reviews";
import { useDispatch, useSelector } from "react-redux";
import {
  setProReview,
  setSingleProData,
} from "../../redux/Slices/productsDataSlice";
export const ProductDetails = () => {
  const dispatch = useDispatch();
  const proReview = useSelector((state) => state.proData.proReview);
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const singleProData = useSelector((state) => state.proData.singleProData);
  const { id } = useParams();

  const relatedProds = relatedProduct.filter(
    (p) => p._id !== singleProData?._id
  );
  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/get/${id}`).then((res) => {
      if (!res?.error) {
        dispatch(setSingleProData(res?.product));

        fetchDataFromApi(
          `/api/product/subCategory/${res?.product?.subCatId}`
        ).then((response) => {
          setRelatedProduct(response?.data);
          setIsLoading(false);
        });
      }
    });
  }, [id]);
  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews/${id}`).then((response) => {
      dispatch(setProReview(response?.data));
    });
  }, []);
  return (
    <section className="py-5">
      <div className="container mx-auto">
        <Breadcrumbs separator="|" aria-label="breadcrumb">
          <Link
            underline="hover"
            className="link transition"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            separator="|"
            underline="hover"
            color="inherit"
            href={`/product-listing?catId=${singleProData?.catId}`}
            className="link transition"
          >
            {singleProData?.catName}
          </Link>
          <Link separator="|" underline="none" color="inherit" className="none">
            {singleProData?.name}
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white py-5 mt-4 relative">
        <div
          className={`absolute inset-0 bg-[#f1f1f1] ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50 left-0 top-0`}
        >
          <CircularProgress className="!text-primary" />
        </div>
        <div className="container mx-auto flex gap-8">
          <div className="productzoomcontainer w-[40%] overflow-hidden">
            {singleProData?.images?.length !== 0 && (
              <ProductZoom data={singleProData?.images} />
            )}
          </div>
          <div className="proCont w-[60%] flex flex-col  justify-center items-start px-10">
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
                readOnly
                precision={0.5}
                size="small"
              />
              <span className="text-xs text-gray-600">
                {proReview?.length !== 0 ? proReview.length : 0} Reviews
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
            <p className="mt-4 text-gray-400 text-sm leading-loose">
              ₹{singleProData?.description}
            </p>
            {singleProData?.size?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Size:</span>
                <div className="flex gap-2">
                  {singleProData?.size?.map((size, idx) => (
                    <Button
                      key={size}
                      onClick={() =>
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx)
                      }
                      onDoubleClickCapture={() => setProductActionIndex(null)}
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
            )}
            {singleProData?.productRam?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Ram:</span>
                <div className="flex gap-2">
                  {singleProData?.productRam?.map((ram, idx) => (
                    <Button
                      key={ram}
                      onClick={() =>
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx)
                      }
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                        productActionIndex === idx
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
            {singleProData?.productWeight?.length !== 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-medium">Weight:</span>
                <div className="flex gap-2">
                  {singleProData?.productWeight?.map((wgt, idx) => (
                    <Button
                      key={wgt}
                      onClick={() =>
                        productActionIndex === idx
                          ? setProductActionIndex(null)
                          : setProductActionIndex(idx)
                      }
                      className={`!w-10 !min-w-10 !h-10 !rounded-full text-lg ${
                        productActionIndex === idx
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
            <p className="text-sm mt-4 mb-2 text-gray-600">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>
            <div className="flex items-center mt-2 mb-8">
              <div className="qtyboxWrapper">
                <QtyBox count={singleProData?.countInStock} />
              </div>
            </div>
            <Button onClick={cartSubmit} className="!px-4 !ml-1 !mb-6 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
              <FaOpencart className="text-xl" /> Add To Cart
            </Button>
            <div className="flex items-center gap-4">
              <span className="flex link transition cursor-pointer gap-2 items-center">
                <FaRegHeart className="text-lg" /> Add To Wishlist
              </span>
              <span className="flex link transition cursor-pointer gap-2 items-center">
                <GoGitCompare className="text-lg" /> Add To Compare
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-10">
        <div className="flex items-center gap-8 mb-4">
          <span
            onClick={() => setActiveTab(0)}
            className={`link transition ${
              activeTab === 0 && "text-red-500"
            } cursor-pointer text-lg font-semibold`}
          >
            Description
          </span>
          <span
            onClick={() => setActiveTab(1)}
            className={`link transition ${
              activeTab === 1 && "text-red-500"
            } cursor-pointer text-lg font-semibold`}
          >
            Reviews ({proReview?.length !== 0 ? proReview.length : 0})
          </span>
        </div>
        {activeTab === 0 && (
          <div className="shadow-md w-full py-5 px-8 rounded-md bg-white text-gray-500">
            {singleProData?.description}
          </div>
        )}
        {activeTab === 1 && <Reviews productId={id} />}
      </div>
      <div className="container mx-auto mt-12">
        <h3 className="text-3xl font-semibold mb-2">Related Products</h3>
        {relatedProds.length !== 0 ? (
          <div className="bg-white px-8 mt-8 rounded-md shadow-md">
            <ProductSlider items={6} data={relatedProds} />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center h-[200px]">
            <p className="text-xl text-black/40">
              {" "}
              Related Products Not Available For This Product
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
