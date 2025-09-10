import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { FaClipboardCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { fetchDataFromApi } from "../../utils/api";
import { setIsLogin } from "../../redux/Slices/authSlice";
import { setPreviews } from "../../redux/Slices/userImage";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Drawer from "@mui/material/Drawer";
import { AiOutlineClose } from "react-icons/ai";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -8px;
    right: -4px;
    font-size: 0.6rem;
    height: 16px;
    min-width: 16px;
    padding: 0 4px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const cartData = useSelector((state) => state.cartData.cartData);
  const myListData = useSelector((state) => state.myListData.myListData);
  const previews = useSelector((state) => state.userImage.previews);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accesstoken")}`,
      { withCredentials: true }
    ).then((res) => {
      console.log(res);
      if (!res.error) {
        dispatch(setIsLogin(false));
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const userAvatar = [];
    if (userDetails?.avatar !== "" && userDetails?.avatar !== undefined) {
      userAvatar.push(userDetails?.avatar);
      dispatch(setPreviews(userAvatar));
    }
  }, [userDetails]);

  return (
    <header className="sticky top-0 left-0 z-[999] shadow-md">
      {/* Top Strip */}
      <div className="top-strip py-2 bg-gray-900 text-white hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-sm font-medium">
            Get up to 50% off new season styles, limited time only
          </p>

          <ul
            className={`flex items-center gap-5 text-sm font-medium ${
              !isLogin && "hidden"
            }`}
          >
            <li>
              <Link to="/" className="link transition hover:text-primary">
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className="link transition hover:text-primary"
              >
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="header py-3 bg-gray-800 text-gray-800">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              className="!text-white"
            >
              <HiOutlineMenuAlt3 size={24} />
            </IconButton>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Link to="/">
              <img
                src="/Images/logo.png"
                alt="Logo"
                className="h-8 md:h-12 object-contain"
              />
            </Link>
          </div>

          {/* Search - Hidden on mobile, visible on tablet and up */}
          <div className="hidden md:block flex-grow max-w-lg mx-8">
            <Search />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {isLogin ? (
              <>
                {/* Account Info - Hidden on mobile */}
                <div className="hidden md:flex">
                  <Button
                    onClick={handleClick}
                    className="!flex !items-center !gap-2 !text-gray-800 !normal-case !px-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                      <img
                        src={
                          previews ||
                          "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                        }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-white text-left">
                      <h4 className="text-xs font-semibold capitalize leading-tight">
                        {userDetails?.name}
                      </h4>
                      <span className="text-xs text-white truncate max-w-[100px]">
                        {userDetails?.email}
                      </span>
                    </div>
                  </Button>
                </div>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  slotProps={{
                    paper: {
                      elevation: 2,
                      sx: {
                        overflow: "visible",
                        mt: 1.5,
                        borderRadius: "8px",
                        minWidth: "200px",
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                >
                  <Link to="/my-account" className="w-full block">
                    <MenuItem
                      onClick={handleClose}
                      className="!flex !gap-3 !py-3"
                    >
                      <FaUser className="text-gray-600" /> My Account
                    </MenuItem>
                  </Link>
                  <Link to="/my-orders" className="w-full block">
                    <MenuItem
                      onClick={handleClose}
                      className="!flex !gap-3 !py-3"
                    >
                      <FaClipboardCheck className="text-gray-600" /> Orders
                    </MenuItem>
                  </Link>
                  <Link to="/my-list" className="w-full block">
                    <MenuItem
                      onClick={handleClose}
                      className="!flex !gap-3 !py-3"
                    >
                      <FaHeart className="text-gray-600" /> My List
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={logout}
                    className="!flex !gap-3 !py-3 text-red-500"
                  >
                    <IoLogOut /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className="hidden text-white md:flex gap-2 text-sm">
                <Link
                  to="/register"
                  className="link transition hover:text-primary"
                >
                  Sign Up
                </Link>
                |
                <Link
                  to="/login"
                  className="link transition hover:text-primary"
                >
                  Log In
                </Link>
              </div>
            )}

            {/* Wishlist Icon */}
            <Tooltip title="Wishlist">
              <IconButton
                onClick={() => {
                  !isLogin
                    ? toast.error("You need to login first")
                    : navigate("/my-list");
                }}
                className="!text-white hover:!text-primary"
                size="medium"
              >
                <FaRegHeart size={18} />
                <CartBadge
                  badgeContent={myListData?.length}
                  color="primary"
                  overlap="circular"
                />
              </IconButton>
            </Tooltip>

            {/* Cart Icon */}
            <Tooltip title="Cart">
              <IconButton
                onClick={() => dispatch(OpenCartPanel())}
                className="!text-white hover:!text-primary"
                size="medium"
              >
                <BsCart3 size={18} />
                <CartBadge
                  badgeContent={cartData.length}
                  color="primary"
                  overlap="circular"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Search for mobile - appears below the main header */}
        <div className="md:hidden container mx-auto px-4 mt-2">
          <Search />
        </div>
      </div>

      {/* Navigation */}
      <Nav />

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/Images/logo1.png"
                alt="Logo"
                className="h-8 object-contain"
              />
            </Link>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <AiOutlineClose />
            </IconButton>
          </div>

          <div className="border-t border-gray-200 pt-4">
            {isLogin ? (
              <div className="mb-4 flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                  <img
                    src={
                      previews ||
                      "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                    }
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold capitalize">
                    {userDetails?.name}
                  </h4>
                  <span className="text-xs text-gray-800 truncate max-w-[120px]">
                    {userDetails?.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 mb-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="space-y-1">
              <Link
                to="/my-account"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="text-gray-500" /> My Account
              </Link>
              <Link
                to="/my-orders"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaClipboardCheck className="text-gray-500" /> Orders
              </Link>
              <Link
                to="/my-list"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHeart className="text-gray-500" /> My List
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help Center
              </Link>
              <Link
                to="/my-orders"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Tracking
              </Link>
              {isLogin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-red-500 w-full text-left"
                >
                  <IoLogOut /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
