import React, { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel"; // Added InputLabel for sub/third selects
import SearchBox from "../../Components/SearchBox";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { setProData } from "../../redux/slices/productsDataSlice";
import toast from "react-hot-toast";
import { setCatData } from "../../redux/slices/categoryDataSlice";

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
  const proData = useSelector((state) => state.proData.proData);
  const catData = useSelector((state) => state.catData.catData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [proCat, setProCat] = useState("All"); // Initial category selection
  const [proSubCat, setProSubCat] = useState(""); // Initial sub-category selection
  const [proTSubCat, setTProSubCat] = useState(""); // Initial third sub-category selection

  const [selectedCatObject, setSelectedCatObject] = useState(null);
  const [selectedSubCatObject, setSelectedSubCatObject] = useState(null);

  // --- Handlers for Category Selects ---
  const handleChangeProCat = (event) => {
    const selectedCatId = event.target.value;
    setProCat(selectedCatId); // Update the selected category ID for the dropdown

    // Reset sub and third sub categories when main category changes
    setProSubCat("");
    setTProSubCat("");
    setSelectedSubCatObject(null); // Clear selected sub-category object

    if (selectedCatId === "All") {
      // If "All" is selected, fetch all products
      fetchDataFromApi("/api/product").then((res) => {
        dispatch(setProData(res?.data));
      });
      setSelectedCatObject(null); // Clear selected category object
    } else {
      // If a specific category is selected, fetch products for that category
      fetchDataFromApi(`/api/product/category/${selectedCatId}`).then((res) => {
        dispatch(setProData(res?.data));
      });
      // Find the selected category object to populate sub-categories
      const foundCat = catData.find((cat) => cat._id === selectedCatId);
      setSelectedCatObject(foundCat);
    }
  };

  const handleChangeProSubCat = (event) => {
    const selectedSubCatId = event.target.value;
    setProSubCat(selectedSubCatId); // Update the selected sub-category ID for the dropdown

    // Reset third sub category when sub-category changes
    setTProSubCat("");

    // Fetch products based on selected sub-category
    fetchDataFromApi(`/api/product/subCategory/${selectedSubCatId}`).then(
      (res) => {
        dispatch(setProData(res?.data));
      }
    );

    // Find the selected sub-category object to populate third-level sub-categories
    const foundSubCat = selectedCatObject?.children?.find(
      (subCat) => subCat._id === selectedSubCatId
    );
    setSelectedSubCatObject(foundSubCat);
  };

  const handleChangeProTSubCat = (event) => {
    const selectedTSubCatId = event.target.value;
    setTProSubCat(selectedTSubCatId); // Update the selected third sub-category ID

    // Fetch products based on selected third sub-category
    fetchDataFromApi(`/api/product/thirdSubCategory/${selectedTSubCatId}`).then(
      (res) => {
        dispatch(setProData(res?.data));
      }
    );
  };

  // These selectByName functions are not actively used for dropdown logic
  // in this component but are left as they might be used elsewhere or for other purposes.
  const selectCatByName = (name) => {
    // This function can be used to set a catName in formFields if needed,
    // but the dropdown selection is handled by value={cat?._id}
  };
  const selectSubCatByName = (name) => {
    // Similar to selectCatByName, mainly for display or form data population
  };
  const selectThirdSubCatByName = (name) => {
    // Similar to selectCatByName, mainly for display or form data population
  };

  // --- Table Pagination Handlers ---
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // --- Product Removal Handler ---
  const removeProduct = (id) => {
    deleteData(`/api/product/${id}`, {
      withCredentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res?.data.message);
          // Re-fetch all products after deletion
          fetchDataFromApi("/api/product").then((res) => {
            dispatch(setProData(res?.data));
          });
        } else {
          toast.error(res?.data.message);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    });
  };

  // --- Initial Data Fetching on Component Mount ---
  useEffect(() => {
    fetchDataFromApi("/api/product").then((res) => {
      dispatch(setProData(res?.data));
    });
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
    });
  }, []); // Empty dependency array means this runs once on mount

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

      <div className="card my-4 p-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center w-full mb-4">
          {/* Main Category Filter */}
          <div className="col w-[15%]">
            <h4 className="text-lg font-semibold mb-3">Category By</h4>
            {catData?.length > 0 && ( // Ensure catData is available
              <FormControl fullWidth size="small">
                <InputLabel id="proCat-label">Select Category</InputLabel>
                <Select
                  style={{ zoom: "80%" }}
                  className="focus:!outline-black/50"
                  labelId="proCat-label"
                  size="medium"
                  id="proCat"
                  value={proCat}
                  label="Select Category"
                  onChange={handleChangeProCat}
                >
                  <MenuItem value="All">All</MenuItem>{" "}
                  {/* Option to show all products */}
                  {catData?.map((cat) => (
                    <MenuItem
                      onClick={() => selectCatByName(cat?.name)}
                      key={cat?._id}
                      value={cat?._id}
                    >
                      {cat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Sub Category Filter - Conditionally rendered */}
          <div className="col w-[15%] ml-3">
            <h4
              className={`text-lg font-semibold mb-3 ${
                !selectedCatObject?.children?.length > 0 && "hidden"
              }`}
            >
              Sub Category By
            </h4>
            {selectedCatObject?.children?.length > 0 && ( // Only show if parent has children
              <FormControl fullWidth size="small">
                <InputLabel id="proSubCat-label">
                  Select Sub Category
                </InputLabel>
                <Select
                  style={{ zoom: "80%" }}
                  className="focus:!outline-black/50"
                  labelId="proSubCat-label"
                  size="medium"
                  id="proSubCat"
                  value={proSubCat}
                  label="Select Sub Category"
                  onChange={handleChangeProSubCat}
                >
                  {selectedCatObject.children.map((subCat) => (
                    <MenuItem
                      onClick={() => selectSubCatByName(subCat?.name)}
                      key={subCat?._id}
                      value={subCat?._id}
                    >
                      {subCat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Third Level Sub Category Filter - Conditionally rendered */}
          <div className="col w-[20%] ml-3">
            <h4
              className={`text-lg font-semibold mb-3 ${
                !selectedSubCatObject?.children?.length > 0 && "hidden"
              }`}
            >
              Third Sub Category By
            </h4>
            {selectedSubCatObject?.children?.length > 0 && ( // Only show if sub-category has children
              <FormControl fullWidth size="small">
                <InputLabel id="proTSubCat-label">
                  Select Third Level Sub Category
                </InputLabel>
                <Select
                  style={{ zoom: "80%" }}
                  className="focus:!outline-black/50"
                  labelId="proTSubCat-label"
                  size="medium"
                  id="proTSubCat"
                  value={proTSubCat}
                  label="Select Third Level Sub Category"
                  onChange={handleChangeProTSubCat}
                >
                  {selectedSubCatObject.children.map((thirdSubCat) => (
                    <MenuItem
                      onClick={() => selectThirdSubCatByName(thirdSubCat?.name)}
                      key={thirdSubCat?._id}
                      value={thirdSubCat?._id}
                    >
                      {thirdSubCat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
              {proData?.length !== 0 &&
                proData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((pro) => (
                    <TableRow key={pro._id}>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4">
                          <div className="img w-[55px] h-[55px] rounded-md overflow-hidden">
                            <Link to={`/product/${pro._id}`}>
                              <img
                                src={pro.images[0]}
                                className="w-full"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="info">
                            <h3 className="font-bold text-sm link">
                              <Link to={`/product/${pro._id}`}>{pro.name}</Link>
                            </h3>
                            <span className="text-[12px]">
                              {pro.thirdSubCat}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {pro.catName}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {pro.subCat}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex gap-2 text-[16px]">
                          <span className="line-through text-gray-500">
                            ${pro.oldPrice}
                          </span>
                          <span className="text-primary">${pro.price}</span>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="text-sm">
                          <span className="font-semibold mr-2">{pro.sale}</span>
                          Sales
                        </span>
                        <Progress value={pro.sale} />
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <TooltipMUI title="Edit Product" placement="top">
                          <Button
                            onClick={() =>
                              dispatch(
                                setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Product",
                                  id: pro._id,
                                })
                              )
                            }
                            className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full"
                          >
                            <FiEdit2 className="text-lg" />
                          </Button>
                        </TooltipMUI>
                        <TooltipMUI
                          title="View Product Details"
                          placement="top"
                        >
                          {" "}
                          <Link to={`/product/${pro._id}`}>
                            <Button className="!w-8 !bg-blue-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                              <FiEye className="text-lg" />
                            </Button>
                          </Link>
                        </TooltipMUI>
                        <TooltipMUI title="Delete Product" placement="top">
                          <Button
                            onClick={() => removeProduct(pro._id)}
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
          count={proData?.length}
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
