import React from "react";
import Button from "@mui/material/Button";
import { RiSearch2Line } from "react-icons/ri";
import { useState } from "react";
import { postData } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../redux/Slices/productsDataSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useRef } from "react";
export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.proData.searchData);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);
  const onChangeInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const obj = {
        page: 1,
        limit: 3,
        query: value,
      };

      if (value !== "") {
        postData(`/api/product/search`, obj).then((res) => {
          dispatch(setSearchData(res));
        });
      }
    }, 500);
  };

  const search = () => {
    setLoading(true);
    if (searchQuery === "") {
      toast.error("search field is empty");
      setLoading(false);
    } else {
      navigate("/search");
      setSearchQuery("");
      setLoading(false);
    }
  };
  return (
    <div className="searchbox w-full max-w-xl mx-auto h-[50px] bg-[#f1f1f1] rounded-full relative p-2 text-black">
      {/* Search Input */}
      <input
        className="w-full h-full focus:outline-none bg-transparent pl-4 pr-12 text-sm placeholder-gray-500"
        type="text"
        value={searchQuery}
        placeholder="Search for Products..."
        onChange={onChangeInput}
      />

      {/* Search Button */}
      <Button
        onClick={search}
        className="!absolute !top-1/2 !right-2 !-translate-y-1/2 !w-9 !h-9 !min-w-[36px] !text-primary !rounded-full"
      >
        {loading ? (
          <CircularProgress size={18} className="text-primary" />
        ) : (
          <RiSearch2Line className="text-xl text-gray-600" />
        )}
      </Button>

      {/* Dropdown Search Results */}
      {searchQuery && searchData?.data?.length > 0 && (
        <div className="searchData absolute top-[55px] left-0 w-full bg-white rounded-md shadow-lg max-h-[300px] overflow-y-auto z-40 border border-gray-300">
          {searchData.data.map((item) => (
            <div
              key={item._id}
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                navigate(`/product-details/${item._id}`);
                setSearchQuery("");
                dispatch(setSearchData({ data: [] }));
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-800 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-600">
                  ₹ {item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
