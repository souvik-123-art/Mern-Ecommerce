import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { OpenSidePanel } from "../../redux/slices/sidePanelSlice";
import { setIsLogin } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { setPreviews } from "../../redux/slices/userImage";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import AddProduct from "../../Pages/Products/AddProduct";
import AddHomeSlide from "../../Pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "../../Pages/Category/AddCategory";
import EditCategory from "../../Pages/Category/EditCategory";
import AddSubCategory from "../../Pages/Category/AddSubCategory";
import AddAddress from "../../Pages/Address/AddAddress";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import Slide from "@mui/material/Slide";
import EditProduct from "../../Pages/Products/EditProduct";
import AddBannerV1 from "../../Pages/Banners/addBannerV1";
import EditBannerV1 from "../../Pages/Banners/editBannerV1";
import AddBlog from "../../Pages/Blog/addBlog";
import EditBlog from "../../Pages/Blog/editBlog";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 1,
    top: 1,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));
export const Header = () => {
  const dispatch = useDispatch();
  const sideBarOpen = useSelector((state) => state.sidePanel.sidePanelOpen);
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const previews = useSelector((state) => state.userImage.previews);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  const logout = () => {
    setAnchorMyAcc(null);
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
    <>
      <header
        className={`w-full h-[70px] ${
          sideBarOpen ? "pl-[18.5rem]" : "pl-4"
        } bg-white flex items-center justify-between shadow-md sticky top-0 left-0 z-10 transition-all duration-300`}
      >
        {/* Sidebar Toggle Button */}
        <div className="part1">
          <Button
            onClick={() => dispatch(OpenSidePanel(!sideBarOpen))}
            className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-black/80"
          >
            {sideBarOpen ? (
              <HiOutlineMenuAlt2 className="text-2xl sm:text-3xl" />
            ) : (
              <HiOutlineMenu className="text-2xl sm:text-3xl" />
            )}
          </Button>
        </div>

        {/* Right Section */}
        <div className="part2 flex items-center gap-4 sm:gap-6 pr-4 sm:pr-7">
          {/* Notification Bell */}
          {/* <IconButton aria-label="notifications" size="large">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell className="text-xl sm:text-2xl" />
            </StyledBadge>
          </IconButton> */}

          {/* User Avatar and Dropdown Menu */}
          <div className="relative">
            <div
              onClick={handleClickMyAcc}
              className="rounded-full w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] overflow-hidden cursor-pointer"
            >
              {previews?.length ? (
                <img
                  src={previews}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                  alt="Default Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <Menu
              anchorEl={anchorMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className="flex items-center py-2 px-3 gap-3">
                <div className="rounded-full w-[40px] h-[40px] overflow-hidden pointer-events-none">
                  {previews?.length ? (
                    <img
                      src={previews}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                      alt="Default Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="info">
                  <h3 className="text-[15px] font-semibold">
                    {userDetails?.name}
                  </h3>
                  <p className="text-xs opacity-70">{userDetails?.email}</p>
                </div>
              </div>

              <Divider className="!mb-2" />

              <Link to="/profile">
                <MenuItem className="flex items-center gap-3">
                  <FaRegUser className="text-[16px]" />
                  <span className="text-sm">Profile</span>
                </MenuItem>
              </Link>

              <MenuItem onClick={logout} className="flex items-center gap-2">
                <IoIosLogOut className="text-[18px]" />
                <span className="text-sm">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </header>

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => dispatch(setIsOpenFullScreenPanel({ open: false }))}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                dispatch(setIsOpenFullScreenPanel({ open: false }))
              }
              aria-label="close"
            >
              <IoClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
        {isOpenFullScreenPanel?.model === "Edit Product" && <EditProduct />}
        {isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />}
        {isOpenFullScreenPanel?.model === "Add Category" && <AddCategory />}
        {isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />}
        {isOpenFullScreenPanel?.model === "Add Sub Category" && (
          <AddSubCategory />
        )}
        {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
        {isOpenFullScreenPanel?.model === "Add Banner V1" && <AddBannerV1 />}
        {isOpenFullScreenPanel?.model === "Add Blog" && <AddBlog />}
        {isOpenFullScreenPanel?.model === "Edit Banner V1" && <EditBannerV1 />}
        {isOpenFullScreenPanel?.model === "Edit Blog" && <EditBlog />}
      </Dialog>
    </>
  );
};
