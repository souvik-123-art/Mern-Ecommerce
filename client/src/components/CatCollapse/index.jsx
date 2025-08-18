import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegMinusSquare } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
export const CatCollapse = () => {
  const catData = useSelector((state) => state.catData.catData);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
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
  return (
    <div className="scroll">
      <ul className="w-full">
        {catData?.length !== 0 &&
          catData?.map((cat, idx) => (
            <li className="relative" key={cat._id}>
              <Link>
                <Button className="w-full !justify-start !px-3 !text-[rgba(0,0,0,0.8)] !font-bold hover:!bg-transparent hover:!text-primary !transition !text-[18px]">
                  {cat.name}
                </Button>
              </Link>
              {submenuIndex === idx ? (
                <FaRegMinusSquare
                  onClick={() => openSubmenu(idx)}
                  className="absolute text-sm top-[14px] right-4 cursor-pointer"
                />
              ) : (
                <FaRegPlusSquare
                  onClick={() => openSubmenu(idx)}
                  className="absolute text-sm top-[14px] right-4 cursor-pointer"
                />
              )}

              {submenuIndex === idx && (
                <ul className="submenu px-3">
                  {cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, Sidx) => (
                      <li className="relative" key={subCat._id}>
                        <Link>
                          <Button className="w-full !mb-2 !justify-start !px-3 !text-[rgba(0,0,0,0.8)] !font-[500] hover:!bg-transparent hover:!text-primary !transition !text-[16px]">
                            {subCat.name}
                          </Button>
                        </Link>
                        {innerSubmenuIndex === Sidx ? (
                          <FaRegMinusSquare
                            onClick={() => openInnerSubmenu(Sidx)}
                            className="absolute text-sm top-[12px] right-4 cursor-pointer"
                          />
                        ) : (
                          <FaRegPlusSquare
                            onClick={() => openInnerSubmenu(Sidx)}
                            className="absolute text-sm top-[12px] right-4 cursor-pointer"
                          />
                        )}

                        {innerSubmenuIndex === Sidx && (
                          <ul className="inner_submenu pl-3">
                            {subCat?.children?.length !== 0 &&
                              subCat?.children?.map((tSubCat) => (
                                <li className="mb-3" key={tSubCat._id}>
                                  <Link className="w-full justify-start !px-3 text-[rgba(0,0,0,0.8)]  hover:bg-transparent hover:text-primary transition text-[14px]">
                                    {tSubCat.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
