import { useState } from "react";
import { Link, Links } from "react-router-dom";
import { Search } from "../Search";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { BsCart3 } from "react-icons/bs";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Nav } from "./Nav";
import { OpenCartPanel } from "../../redux/Slices/cartPanelSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { FaClipboardCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isLogin = useSelector((state) => state.auth.isLogin);

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
          <div className="col2 w-[40%]">
            <Search />
          </div>
          <div className="col3 w-[35%] flex items-center pl-5">
            <ul className="flex items-center gap-3 w-full justify-end">
              {isLogin ? (
                <>
                  <Button
                    onClick={handleClick}
                    className="!text-white !myAccountWrap !flex !items-center !gap-3"
                  >
                    <div
                      className="!w-[35px] !h-[35px] !rounded-full flex justify-center items-center !bg-[#f1f1f1]"
                    >
                      <FaRegUser className="text-xl text-black/80" />
                    </div>
                    <div className="info !flex !flex-col !items-start !text-white">
                      <h4 className="text-sm font-semibold capitalize">
                        Souvik Sarkar
                      </h4>
                      <span className="text-xs">example@gmail.com</span>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    className="myaccountList"
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 35,
                            height: 35,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link className="w-full block" to="/my-account">
                      <MenuItem
                        className="flex gap-3 !py-3 !font-['lexend']"
                        onClick={handleClose}
                      >
                        <FaUser />{" "}
                        <span className="text-[14px]">My Account</span>
                      </MenuItem>
                    </Link>
                    <Link className="w-full block" to="/my-orders">
                      <MenuItem
                        className="flex gap-3 !py-3 !font-['lexend']"
                        onClick={handleClose}
                      >
                        <FaClipboardCheck />{" "}
                        <span className="text-[14px]">Orders</span>
                      </MenuItem>
                    </Link>
                    <Link className="w-full block" to="/my-list">
                      <MenuItem
                        className="flex gap-3 !py-3 !font-['lexend']"
                        onClick={handleClose}
                      >
                        <FaHeart /> <span className="text-[14px]">My List</span>
                      </MenuItem>
                    </Link>
                    <Link className="w-full block" to="/logout">
                      <MenuItem
                        className="flex gap-3 !py-3 !font-['lexend']"
                        onClick={handleClose}
                      >
                        <IoLogOut className="text-xl" />{" "}
                        <span className="text-[14px]">Logout</span>
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              ) : (
                <li>
                  <Link
                    to="/register"
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
              )}
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
                  <IconButton
                    className="!text-white hover:!text-primary"
                    onClick={() => dispatch(OpenCartPanel())}
                  >
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
      <Nav />
    </header>
  );
};

export default Header;
