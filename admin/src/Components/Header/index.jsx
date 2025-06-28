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
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  useEffect(() => {
    dispatch(setIsLogin(false));
  }, []);
  return (
    <header
      className={`w-full h-[70px] ${
        sideBarOpen ? "pl-[18.5rem]" : "pl-7"
      } bg-[#fff] flex items-center justify-between shadow-md sticky top-0 left-0 z-10 transition-all duration-300`}
    >
      <div className="part1">
        <Button
          onClick={() => dispatch(OpenSidePanel(!sideBarOpen))}
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-black/80"
        >
          {sideBarOpen ? (
            <HiOutlineMenuAlt2 className="text-3xl" />
          ) : (
            <HiOutlineMenu className="text-3xl" />
          )}
        </Button>
      </div>
      <div className="part2 w-[40%] flex items-center justify-end gap-6 pr-7">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        {isLogin === true ? (
          <div className="relative">
            <div
              onClick={handleClickMyAcc}
              className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
            >
              <img
                src="https://static.wikia.nocookie.net/theloudhousefanon/images/9/96/John_Xina.webp"
                alt=""
                className="w-full h-full object-cover"
              />
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
              <div className="flex items-center py-1 mb-2 px-3 gap-3">
                <div className="rounded-full w-[40px] h-[40px] overflow-hidden pointer-events-none">
                  <img
                    src="https://static.wikia.nocookie.net/theloudhousefanon/images/9/96/John_Xina.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="info">
                  <h3 className="text-[15px] leading-5 font-[500]">
                    Souvik Sarkar
                  </h3>
                  <p className="text-xs opacity-70 font-[400]">
                    example@gmail.com
                  </p>
                </div>
              </div>
              <Divider className="!mb-2" />
              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-3"
              >
                <FaRegUser className="text-[16px]" />
                <span className="text-sm">Profile</span>
              </MenuItem>
              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-2"
              >
                <IoIosLogOut className="text-[18px]" />
                <span className="text-sm">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link className="block" to="/signin">
              {" "}
              <Button className="btn-blue btn-sm !rounded-full">Sign In</Button>
            </Link>
            <span className="block h-[20px] w-[1px] bg-gray-300"></span>
            <Link className="block" to="/signup">
              <Button className="btn-blue-b btn-sm !rounded-full">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
