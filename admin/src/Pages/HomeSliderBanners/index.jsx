import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TooltipMUI from "@mui/material/Tooltip";
import Progress from "../../Components/ProgressBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchBox from "../../Components/SearchBox";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "image", label: "Image", minWidth: 300 },
  { id: "action", label: "Action", minWidth: 100 },
];
const HomeSliderBanners = () => {
  const dispatch = useDispatch();
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="py-3 flex items-center">
        <h2 className="text-3xl font-bold">Home Slider Banners</h2>
        <div className="col ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
            Export
          </Button>
          <Button
            className="btn-blue btn !flex !items-center !gap-1"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Home Slide",
                })
              )
            }
          >
            <FaPlus />
            Add Home Slide
          </Button>
        </div>
      </div>

      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={70}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    width={column.minWidth}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={300}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-full rounded-md overflow-hidden">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1748955943280_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
                        className="w-full"
                        alt=""
                      />
                    </div>
                  </div>
                </TableCell>

                <TableCell width={100}>
                  <TooltipMUI title="Edit Product" placement="top">
                    <Button className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEdit2 className="text-lg" />
                    </Button>
                  </TooltipMUI>
                  <TooltipMUI title="View Product Details" placement="top">
                    <Button className="!w-8 !bg-blue-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEye className="text-lg" />
                    </Button>
                  </TooltipMUI>
                  <TooltipMUI title="Delete Product" placement="top">
                    <Button className="!w-8 !bg-red-500 !text-lg !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <RiDeleteBin6Line />
                    </Button>
                  </TooltipMUI>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default HomeSliderBanners;
