import React, { useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 1,
    top: 1,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));
export const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  return (
    <header className="w-full h-[70px] pl-80 bg-[#fff] flex items-center justify-between shadow-md ">
      <div className="part1">
        <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-black/80">
          <RiMenu2Fill className="text-xl" />
        </Button>
      </div>
      <div className="part2 w-[40%] flex items-center justify-end gap-6 pr-7">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>
        <div className="relative">
          <div
            onClick={handleClickMyAcc}
            className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfEzkFf0SaFrcqNWkn75p_Mi1xcn-524sDA&s"
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfEzkFf0SaFrcqNWkn75p_Mi1xcn-524sDA&s"
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
            <Divider className="!mb-2"/>
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
      </div>
    </header>
  );
};
