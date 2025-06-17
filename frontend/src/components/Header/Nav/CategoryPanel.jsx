import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { RxCross1 } from "react-icons/rx";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegMinusSquare } from "react-icons/fa";
export const CategoryPanel = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };
  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="catpanel">
      <h3 className="p-3 text-[17px] font-[500] border-b-[1px] flex gap-4 items-center justify-between">
        Shop By Categories
        <RxCross1
          onClick={toggleDrawer(false)}
          className="cursor-pointer transition hover:text-primary text-xl"
        />
      </h3>

      <div className="scroll">
        <ul className="w-full">
          <li className="relative">
            <Link>
              <Button className="w-full !justify-start !px-3 !text-[rgba(0,0,0,0.8)] !font-bold hover:!bg-transparent hover:!text-primary !transition !text-[18px]">
                Fashion
              </Button>
            </Link>
            {submenuIndex === 0 ? (
              <FaRegMinusSquare
                onClick={() => openSubmenu(0)}
                className="absolute text-sm top-[14px] right-4 cursor-pointer"
              />
            ) : (
              <FaRegPlusSquare
                onClick={() => openSubmenu(0)}
                className="absolute text-sm top-[14px] right-4 cursor-pointer"
              />
            )}

            {submenuIndex === 0 && (
              <ul className="submenu pl-3">
                <li className="relative">
                  <Link>
                    <Button className="w-full !mb-2 !justify-start !px-3 !text-[rgba(0,0,0,0.8)] !font-bold hover:!bg-transparent hover:!text-primary !transition !text-[16px]">
                      Apparel
                    </Button>
                  </Link>
                  {innerSubmenuIndex === 0 ? (
                    <FaRegMinusSquare
                      onClick={() => openInnerSubmenu(0)}
                      className="absolute text-sm top-[12px] right-4 cursor-pointer"
                    />
                  ) : (
                    <FaRegPlusSquare
                      onClick={() => openInnerSubmenu(0)}
                      className="absolute text-sm top-[12px] right-4 cursor-pointer"
                    />
                  )}

                  {innerSubmenuIndex === 0 && (
                    <ul className="inner_submenu pl-3">
                      <li className="mb-3">
                        <Link className="w-full justify-start !px-3 text-[rgba(0,0,0,0.8)]  hover:bg-transparent hover:text-primary transition text-[14px]">
                          Smart Tablet
                        </Link>
                      </li>
                      <li className="mb-3">
                        <Link className="w-full justify-start !px-3 text-[rgba(0,0,0,0.8)]  hover:bg-transparent hover:text-primary transition text-[14px]">
                          Crepe T-shirt
                        </Link>
                      </li>
                      <li className="mb-3">
                        <Link className="w-full justify-start !px-3 text-[rgba(0,0,0,0.8)]  hover:bg-transparent hover:text-primary transition text-[14px]">
                          Leather Watch
                        </Link>
                      </li>
                      <li className="mb-3">
                        <Link className="w-full justify-start !px-3 text-[rgba(0,0,0,0.8)]  hover:bg-transparent hover:text-primary transition text-[14px]">
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
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
