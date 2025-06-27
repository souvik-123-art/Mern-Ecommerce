import React, { useState } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { GiHand } from "react-icons/gi";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { TfiAngleDown } from "react-icons/tfi";
import Badge from "../../Components/Badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export const Dashboard = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
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
      <div className="w-full py-5 px-8 border border-gray-200 flex items-center justify-between gap-8 mb-5 rounded-md bg-[#f1faff]">
        <div className="info">
          <h1 className="text-[35px] font-bold">Good Morning,</h1>
          <span className="text-[35px] mb-3 font-bold flex items-center gap-5">
            {" "}
            Souvik <GiHand className="text-5xl text-yellow-400" />
          </span>
          <p className="text-lg mb-8 text-black/60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
            temporibus!
          </p>
          <Button className="btn-blue !mb-3 !px-4 !flex !gap-3 !py-2 !capitalize">
            Add Product <FaPlus />
          </Button>
        </div>
        <img src="/shop-illustration.png" className="w-[350px]" alt="" />
      </div>
      <DashboardBoxes />
      <div className="card my-4 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <div class="relative overflow-x-auto mt-1 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Button
                    onClick={() => isShowOrderProduct(0)}
                    className={`!w-[35px] !h-[35px] !min-w-[35px] !duration-300 !rounded-full !bg-[#f1f1f1] !text-black !transition-all ${
                      isOpenOrderProduct === 0 ? "-rotate-180" : ""
                    }`}
                  >
                    <TfiAngleDown className="text-[14px]" />
                  </Button>
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-primary">6464654646546</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-primary">6464654646546</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Souvik Sarkar</td>
                <td className="px-6 py-4 whitespace-nowrap">7000494543</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  sdfsdfisdifshdifhsidhfsdhfsdifisdhfisdifisdfsdifisdfidsifisd
                </td>
                <td className="px-6 py-4 whitespace-nowrap">700049</td>
                <td className="px-6 py-4 whitespace-nowrap">2499/-</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Souvik@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">sda344dfsdsdf</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">23.01.2025</td>
              </tr>
              {isOpenOrderProduct === 0 && (
                <tr>
                  <td colSpan={6} className="pl-20">
                    <div className="relative overflow-x-scroll">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className=" bg-white border border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                6464654646546
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                A-Line Kurti With Sharara & Dupatta
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                          </tr>
                          <tr className=" bg-white border border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                6464654646546
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                A-Line Kurti With Sharara & Dupatta
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              <tr className="bg-white border border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Button
                    onClick={() => isShowOrderProduct(1)}
                    className={`!w-[35px] !h-[35px] !min-w-[35px] !duration-300 !rounded-full !bg-[#f1f1f1] !text-black !transition-all ${
                      isOpenOrderProduct === 1 ? "-rotate-180" : ""
                    }`}
                  >
                    <TfiAngleDown className="text-[14px]" />
                  </Button>
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-primary">6464654646546</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-primary">6464654646546</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Souvik Sarkar</td>
                <td className="px-6 py-4 whitespace-nowrap">7000494543</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  sdfsdfisdifshdifhsidhfsdhfsdifisdhfisdifisdfsdifisdfidsifisd
                </td>
                <td className="px-6 py-4 whitespace-nowrap">700049</td>
                <td className="px-6 py-4 whitespace-nowrap">2499/-</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Souvik@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">sda344dfsdsdf</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status="delivered" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">23.01.2025</td>
              </tr>
              {isOpenOrderProduct === 1 && (
                <tr>
                  <td colSpan={6} className="pl-20">
                    <div className="relative overflow-x-scroll">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className=" bg-white border border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                6464654646546
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                A-Line Kurti With Sharara & Dupatta
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                          </tr>
                          <tr className=" bg-white border border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                6464654646546
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-700">
                                A-Line Kurti With Sharara & Dupatta
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                            <td className="px-6 py-4 whitespace-nowrap">$25</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card my-4 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-xl font-bold">Products</h2>
        </div>
        <div className="flex items-center w-full p-5 justify-between pr-5">
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
          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
              Export
            </Button>
            <Button className="btn-blue btn">Add Product</Button>
          </div>
        </div>
        <div class="relative overflow-x-auto mt-1 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Sub-Category
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" className="px-6 py-2 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border border-gray-200">
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
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
                </td>
                <td className="px-6 py-2 whitespace-nowrap">Electronics</td>
                <td className="px-6 py-2 whitespace-nowrap">Women</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="flex gap-2 text-[16px]">
                    <span className="line-through text-gray-500">$24</span>
                    <span className="text-primary">$24</span>
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span className="text-sm">
                    <span className="font-semibold mr-2">234</span>Sales
                  </span>
                  <Progress value={50} />
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <Tooltip title="Edit Product" placement="top">
                    <Button className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEdit2 className="text-lg" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product Details" placement="top">
                    <Button className="!w-8 !bg-blue-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEye className="text-lg" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Product" placement="top">
                    <Button className="!w-8 !bg-red-500 !text-lg !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <RiDeleteBin6Line />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center my-6">
          <Pagination count={10} color="primary" />
        </div>
      </div>
      <div className="card my-4 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-xl font-bold">Products (material ui)</h2>
        </div>
        <div className="flex items-center w-full p-5 justify-between pr-5 mb-2">
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
          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
              Export
            </Button>
            <Button className="btn-blue btn">Add Product</Button>
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
                  <Tooltip title="Edit Product" placement="top">
                    <Button className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEdit2 className="text-lg" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="View Product Details" placement="top">
                    <Button className="!w-8 !bg-blue-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <FiEye className="text-lg" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Product" placement="top">
                    <Button className="!w-8 !bg-red-500 !text-lg !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                      <RiDeleteBin6Line />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          // count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};
