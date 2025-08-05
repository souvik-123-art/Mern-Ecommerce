import React, { useEffect, useState } from "react";
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
import { deleteData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setCatData } from "../../redux/slices/categoryDataSlice";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "catImage", label: "Category Image", minWidth: 100 },
  { id: "catName", label: "Category Name", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];
const CategoryList = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.catData.catData);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const removeCategory = (id) => {
    deleteData(`/api/category/deleteCategory/${id}`, {
      withCredentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res?.data.message);
          fetchDataFromApi("/api/category").then((res) => {
            dispatch(setCatData(res?.data));
          });
        } else {
          toast.error(res?.data.message);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    });
  };
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
    });
  }, [isOpenFullScreenPanel]);
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
        <h2 className="text-3xl font-bold">Category List</h2>
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
                  model: "Add Category",
                })
              )
            }
          >
            <FaPlus />
            Add Category
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
              {catData?.length !== 0 &&
                catData?.map((item, idx) => (
                  <TableRow key={item.name}>
                    <TableCell>
                      <Checkbox {...label} size="small" />
                    </TableCell>
                    <TableCell width={100}>
                      <div className="flex items-center gap-4 w-[70px]">
                        <div className="img w-full rounded-md overflow-hidden">
                          <img src={item.images} className="w-full" alt="" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell width={100}>
                      <span>{item.name}</span>
                    </TableCell>
                    <TableCell width={100}>
                      <TooltipMUI title="Edit Category" placement="top">
                        <Button
                          onClick={() =>
                            dispatch(
                              setIsOpenFullScreenPanel({
                                open: true,
                                model: "Edit Category",
                                id: item._id,
                              })
                            )
                          }
                          className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full"
                        >
                          <FiEdit2 className="text-lg" />
                        </Button>
                      </TooltipMUI>
                      <TooltipMUI title="Delete Category" placement="top">
                        <Button
                          onClick={() => removeCategory(item._id)}
                          className="!w-8 !bg-red-500 !text-lg !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full"
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </TooltipMUI>
                    </TableCell>
                  </TableRow>
                ))}
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

export default CategoryList;
