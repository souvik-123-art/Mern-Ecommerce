import React, { useEffect, useState } from "react";
import "../Sidebar/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
import { setSearchData } from "../../redux/Slices/productsDataSlice";
export const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [isCatOpen, setIsCatOpen] = useState(true);
  const location = useLocation();
  const [isAvaOpen, setIsAvaOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const catData = useSelector((state) => state.catData.catData);
  const searchData = useSelector((state) => state.proData.searchData);
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 5,
  });
  const [price, setPrice] = useState([0, 60000]);

  const handleCheckboxChange = (field, value) => {
    dispatch(setSearchData([]));
    const currentVal = filters[field] || [];
    const updatedVal = currentVal?.includes(value)
      ? currentVal.filter((item) => item !== value)
      : [...currentVal, value];
    setFilters((prev) => ({
      ...prev,
      [field]: updatedVal,
    }));
    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdSubCatId: [],
      }));
    }
  };
  const filterData = () => {
    props?.setIsLoading(true);
    if (searchData?.data?.length > 0) {
      props?.setProductsData(searchData?.data);
      props?.setIsLoading(false);
      props?.setTotalPages(searchData?.totalPages);
      window.scrollTo(0, 0);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        postData("/api/product/sortBy", {
          products: res?.products,
          sortBy: "name",
          order: "asc",
        }).then((response) => {
          props?.setProductsData(response?.products);
        });
        props?.setIsLoading(false);
        props?.setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      });
    }
  };
  useEffect(() => {
    const url = window.location.href;
    const queryParam = new URLSearchParams(location.search);
    if (url.includes("catId")) {
      dispatch(setSearchData([]));
      const categoryId = queryParam.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
    }
    if (url.includes("subCatId")) {
      dispatch(setSearchData([]));
      const categoryId = queryParam.get("subCatId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = [];
      filters.subCatId = catArr;
      filters.thirdSubCatId = [];
      filters.rating = [];
    }
    if (url.includes("thirdSubCatId")) {
      dispatch(setSearchData([]));
      const categoryId = queryParam.get("thirdSubCatId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = [];
      filters.subCatId = [];
      filters.thirdSubCatId = catArr;
      filters.rating = [];
    }
    filters.page = 1;
    filterData();
  }, [location]);
  // useEffect(() => {
  //   filters.page = props.page;
  //   filterData();
  // }, [filters, props.page]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: props.page,
    }));
  }, [props.page]);

  // whenever filters change, fetch products
  useEffect(() => {
    filterData();
  }, [filters]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);
  return (
    <aside className="sidebar border border-[#dadada] p-4 sm:p-5 rounded-md w-full lg:w-[100%]">
      {/* Categories */}
      <div className="box">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          CATEGORIES
          <Button
            className="w-[30px] h-[30px] !ml-auto !min-w-[30px] !rounded-full !text-black !transition duration-300"
            onClick={() => setIsCatOpen(!isCatOpen)}
          >
            {isCatOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={isCatOpen}>
          <div className="scroll px-2 sm:px-5 relative -left-[5px] max-h-[300px] sm:max-h-[400px] overflow-y-auto">
            {catData?.length !== 0 &&
              catData?.map((cat) => (
                <FormControlLabel
                  value={cat._id}
                  key={cat._id}
                  control={<Checkbox size="small" />}
                  label={cat.name}
                  checked={filters?.catId?.includes(cat?._id)}
                  onChange={() => handleCheckboxChange("catId", cat?._id)}
                  className="w-full"
                />
              ))}
          </div>
        </Collapse>
      </div>

      {/* Filter By Size */}
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Filter By Size
        </h3>
        <RangeSlider
          value={price}
          onInput={setPrice}
          min={0}
          max={60000}
          step={5}
        />
        <div className="flex flex-col sm:flex-row pt-4 pb-2 priceRange gap-2">
          <span className="text-[13px]">
            From: <strong className="text-black">Rs: {price[0]}</strong>
          </span>
          <span className="text-[13px] ml-auto sm:ml-0">
            To: <strong className="text-black">Rs: {price[1]}</strong>
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Rating
        </h3>
        {[5, 4.5, 4, 3, 2, 1].map((r) => (
          <div className="box w-full" key={r}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              value={r}
              checked={filters?.rating?.includes(r)}
              onChange={() => handleCheckboxChange("rating", r)}
              label={
                <Rating
                  name="size-small"
                  defaultValue={r}
                  precision={r % 1 === 0.5 ? 0.5 : 1}
                  readOnly
                  size="small"
                />
              }
              className="w-full"
            />
          </div>
        ))}
      </div>
    </aside>
  );
};
