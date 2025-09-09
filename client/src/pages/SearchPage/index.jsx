import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductItem } from "../../components/ProductItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { ProductItemListView } from "../../components/ProductItemListView";
import Pagination from "@mui/material/Pagination";
import ProductListSkeleton from "../../components/ProductSkeleton/listViewSkelton";
import ProductSkeleton from "../../components/ProductSkeleton";
import { postData } from "../../utils/api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const SearchPage = () => {
  const catData = useSelector((state) => state.catData.catData);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setItemView] = useState("list");
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectSortValue, setSelectSortValue] = useState("Name, A to Z");
  const [bredcrumb, setBredcrumb] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, value) => {
    setSelectSortValue(value);
    postData("/api/product/sortBy", {
      products,
      sortBy: name,
      order: order,
    }).then((res) => {
      setProductsData(res?.products);
      setAnchorEl(null);
    });
  };

  return (
    <section className="py-5">
      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto flex gap-3 ">
          <div className="sidebarWrapper w-[20%] relative">
            <div className="sticky top-16 max-h-[calc(100vh-40px)] overflow-y-auto">
              <Sidebar
                productsData={productsData}
                setProductsData={setProductsData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                page={page}
                setTotalPages={setTotalPages}
              />
            </div>
          </div>
          <div className="rightCont w-[80%] border border-[#dadada] p-5 rounded-md">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center gap-1">
                <Button
                  onClick={() => setItemView("grid")}
                  className={`!w-[40px] !min-w-[40px] !rounded-full !text-black !h-[40px] ${
                    itemView === "grid" && "!bg-gray-300"
                  } !text-lg`}
                >
                  <IoGrid className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  onClick={() => setItemView("list")}
                  className={`!w-[40px] !min-w-[40px] !rounded-full !text-black !h-[40px] ${
                    itemView === "list" && "!bg-gray-300"
                  } !text-lg`}
                >
                  <FaThList className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  There are{" "}
                  {productsData?.length !== 0 ? productsData?.length : 0}{" "}
                  products
                </span>
              </div>
              <div className="col2 ml-auto flex gap-2 items-center justify-end">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  Sort By:
                </span>
                <div>
                  <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="!bg-white !text-sm !text-black"
                  >
                    {selectSortValue}
                  </Button>
                  <Menu
                    className="!text-sm"
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={() =>
                        handleSortBy(
                          "name",
                          "asc",
                          productsData,
                          "Name, A to Z"
                        )
                      }
                    >
                      Name, A to Z
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={() =>
                        handleSortBy(
                          "name",
                          "desc",
                          productsData,
                          "Name, Z to A"
                        )
                      }
                    >
                      Name, Z to A
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={() =>
                        handleSortBy(
                          "price",
                          "asc",
                          productsData,
                          "Price, Low to High"
                        )
                      }
                    >
                      Price, Low to High
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={() =>
                        handleSortBy(
                          "price",
                          "desc",
                          productsData,
                          "Price, High to Low"
                        )
                      }
                    >
                      Price, High to Low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            {itemView === "grid" ? (
              <div className="grid grid-cols-5 gap-4">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <ProductSkeleton key={i} />
                    ))
                  : productsData?.length !== 0 &&
                    productsData?.map((item) => (
                      <ProductItem key={item?._id} data={item} />
                    ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <ProductListSkeleton key={i} />
                    ))
                  : productsData?.length !== 0 &&
                    productsData?.map((item) => (
                      <ProductItemListView key={item?._id} data={item} />
                    ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination mt-10 flex justify-center">
                <Pagination
                  size="large"
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
