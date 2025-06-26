import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { RxCross1 } from "react-icons/rx";
import { CatCollapse } from "../../CatCollapse";
export const CategoryPanel = (props) => {
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" classNam
    e="catpanel">
      <div className="img p-4 border-b border-b-[#dadada]">
        <img src="/Images/logo1.png" alt="" />
      </div>
      <h3 className="p-3 text-[17px] font-[500] border-b-[1px] flex gap-4 items-center justify-between">
        Shop By Categories
        <RxCross1
          onClick={toggleDrawer(false)}
          className="cursor-pointer transition hover:text-primary text-xl"
        />
      </h3>

      <CatCollapse/>
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
