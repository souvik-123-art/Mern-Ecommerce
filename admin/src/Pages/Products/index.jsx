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
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 120,
  },
];
const Products = () => {
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
        <h2 className="text-3xl font-bold">Products</h2>
        <div className="col ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
            Export
          </Button>
          <Button
            className="btn-blue btn !flex !items-center !gap-1"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({ open: true, model: "Add Product" })
              )
            }
          >
            <FaPlus />
            Add Product
          </Button>
        </div>
      </div>

      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center w-full mb-4">
          <div className="col w-[25%]">
            <h4 className="text-xl font-semibold mb-3">Category By</h4>
            <FormControl fullWidth size="small">
              <Select
                value={categoryFilterVal}
                onChange={handleChangeCatFilter}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "") {
                    return <em>Select Category</em>; // placeholder text
                  }
                  if (selected === 10) return "Men";
                  if (selected === 20) return "Women";
                  if (selected === 30) return "Kids";
                  return selected;
                }}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col w-[25%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="img w-[55px] h-[55px] rounded-md overflow-hidden">
                      <img
                        src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp"
                        className="w-full"
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <h3 className="font-bold text-sm link">
                        <Link to="/product/56465">
                          Practical Steel Keyboard
                        </Link>
                      </h3>
                      <span className="text-[12px]">Books</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-2 text-[16px]">
                    <span className="line-through text-gray-500">$24</span>
                    <span className="text-primary">$24</span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="text-sm">
                    <span className="font-semibold mr-2">234</span>Sales
                  </span>
                  <Progress value={50} />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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

export default Products;
