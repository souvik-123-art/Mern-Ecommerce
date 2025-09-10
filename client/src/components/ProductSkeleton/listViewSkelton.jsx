import React from "react";

const ProductListSkeleton = () => {
  return (
    <div className="productItem overflow-hidden border flex flex-col sm:flex-row p-3 rounded-md animate-pulse w-full">
      {/* Image Wrapper */}
      <div className="imgWrapper rounded-md w-full sm:w-[20%] relative overflow-hidden">
        <div className="img h-[180px] sm:h-[220px] overflow-hidden bg-gray-300 flex items-center justify-center">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        {/* Discount Placeholder */}
        <span className="absolute top-[10px] left-[10px] bg-gray-300 rounded-md w-10 h-4 sm:w-12 sm:h-5"></span>

        {/* Action buttons placeholder */}
        <div className="absolute top-[10px] right-[10px] flex flex-col gap-1 sm:gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info py-3 px-4 sm:px-8 w-full sm:w-[80%] mt-3 sm:mt-0">
        {/* Brand */}
        <div className="h-3 w-16 sm:w-20 bg-gray-300 rounded mb-2"></div>

        {/* Title */}
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>

        {/* Description */}
        <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-[90%] bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-[70%] bg-gray-300 rounded mb-3"></div>

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 sm:w-4 h-3 sm:h-4 bg-gray-300 rounded-full"
            ></div>
          ))}
        </div>

        {/* Price + Add to cart */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-8 w-full sm:w-28 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
