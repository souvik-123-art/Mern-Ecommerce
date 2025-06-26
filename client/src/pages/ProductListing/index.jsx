import React, { useState } from "react";
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
export const ProductListing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setItemView] = useState("grid");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto flex gap-3 ">
          <div className="sidebarWrapper w-[20%] h-full">
            <Sidebar />
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
                  There are 27 products
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
                    Relevance
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
                      onClick={handleClose}
                    >
                      Sales, Highest To Lowest
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={handleClose}
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={handleClose}
                    >
                      Name, A To Z
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={handleClose}
                    >
                      Name, Z To A
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={handleClose}
                    >
                      Price, Low To High
                    </MenuItem>
                    <MenuItem
                      className="!text-sm !font-['lexend']"
                      onClick={handleClose}
                    >
                      Price, High To Low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            {itemView === "grid" ? (
              <div className="grid grid-cols-4 gap-4">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
              </div>
            )}
            <div className="pagination mt-10 flex justify-center">
              <Pagination size="large" count={10} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
