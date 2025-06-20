import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { BsCart3 } from "react-icons/bs";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Nav } from "./Nav";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = () => {
  return (
    <header>
      <div className="top-strip py-2 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%] ">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>
            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li>
                  <Link
                    className="text-[12px] font-[500] transition link"
                    to="/help-center"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[12px] font-[500] transition link"
                    to="/order-tracking"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header py-3 bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"}>
              <img src="/Images/logo.png" alt="" />
            </Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3 w-[30%] flex items-center pl-5">
            <ul className="flex items-center gap-3 w-full justify-end">
              <li>
                <Link
                  to="/signup"
                  className="link transition text-[15px] font-[500]"
                >
                  Sign Up
                </Link>
                &nbsp; | &nbsp;
                <Link
                  className="link transition text-[15px] font-[500]"
                  to="/login"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Tooltip title="Compare">
                  <IconButton className="!text-white hover:!text-primary">
                    <GoGitCompare />
                    <CartBadge
                      badgeContent={2}
                      color="primary"
                      overlap="circular"
                    />
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Wishlist">
                  <IconButton className="!text-white hover:!text-primary">
                    <FaRegHeart />
                    <CartBadge
                      badgeContent={2}
                      color="primary"
                      overlap="circular"
                    />
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton className="!text-white hover:!text-primary">
                    <BsCart3 />
                    <CartBadge
                      badgeContent={2}
                      color="primary"
                      overlap="circular"
                    />
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Nav/>
    </header>
  );
};

export default Header;
