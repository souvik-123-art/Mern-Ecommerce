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
import InputLabel from "@mui/material/InputLabel";
import SearchBox from "../../Components/SearchBox";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
import { setProData } from "../../redux/slices/productsDataSlice";
import toast from "react-hot-toast";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [sortedIds, setSortedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const [proCat, setProCat] = useState("All");
  const [proSubCat, setProSubCat] = useState("");
  const [proTSubCat, setTProSubCat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatObject, setSelectedCatObject] = useState(null);
  const [selectedSubCatObject, setSelectedSubCatObject] = useState(null);
  const [allProd, setAllProd] = useState([]);
  // Helper function to initialize product data with 'checked' property
  const initializeProductsWithChecked = (products) => {
    return (
      products?.map((pro) => ({ ...pro, checked: pro.checked || false })) || []
    );
  };

  const handleChangeProCat = (event) => {
    setIsLoading(true);
    const selectedCatId = event.target.value;
    setProCat(selectedCatId);
    setProSubCat("");
    setTProSubCat("");
    setSelectedSubCatObject(null);

    const fetchProducts =
      selectedCatId === "All"
        ? fetchDataFromApi("/api/product")
        : fetchDataFromApi(`/api/product/category/${selectedCatId}`);

    fetchProducts
      .then((res) => {
        if (!res?.error) {
          dispatch(setProData(initializeProductsWithChecked(res?.data)));
        } else {
          toast.error("Failed to fetch products for category.");
        }
      })
      .catch((error) => {
        toast.error(`Error fetching products: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is stopped
      });

    // Update selectedCatObject after dispatching
    const foundCat = catData.find((cat) => cat._id === selectedCatId);
    setSelectedCatObject(foundCat);
  };

  const handleChangeProSubCat = (event) => {
    setIsLoading(true);
    const selectedSubCatId = event.target.value;
    setProSubCat(selectedSubCatId);
    setTProSubCat("");

    fetchDataFromApi(`/api/product/subCategory/${selectedSubCatId}`) // Fix: Use template literal
      .then((res) => {
        if (!res?.error) {
          dispatch(setProData(initializeProductsWithChecked(res?.data)));
        } else {
          toast.error("Failed to fetch products for sub-category.");
        }
      })
      .catch((error) => {
        toast.error(`Error fetching products: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is stopped
      });

    const foundSubCat = selectedCatObject?.children?.find(
      (subCat) => subCat._id === selectedSubCatId
    );
    setSelectedSubCatObject(foundSubCat);
  };

  const handleChangeProTSubCat = (event) => {
    setIsLoading(true);
    const selectedTSubCatId = event.target.value;
    setTProSubCat(selectedTSubCatId);

    fetchDataFromApi(`/api/product/thirdSubCategory/${selectedTSubCatId}`) // Fix: Use template literal
      .then((res) => {
        if (!res?.error) {
          dispatch(setProData(initializeProductsWithChecked(res?.data)));
        } else {
          toast.error("Failed to fetch products for third sub-category.");
        }
      })
      .catch((error) => {
        toast.error(`Error fetching products: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is stopped
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const removeProduct = (id) => {
    setIsLoading(true);
    deleteData(`/api/product/${id}`, {
      credentials: true,
    })
      .then((res) => {
        try {
          if (!res?.data?.error) {
            toast.success(res?.data.message);
            fetchDataFromApi("/api/product")
              .then((fetchRes) => {
                if (!fetchRes?.error) {
                  dispatch(
                    setProData(initializeProductsWithChecked(fetchRes?.data))
                  );
                } else {
                  toast.error("Failed to refresh product list.");
                }
              })
              .catch((error) => {
                toast.error(`Error refreshing products: ${error.message}`);
              })
              .finally(() => {
                setIsLoading(false); // Ensure loading is stopped
              });
          } else {
            toast.error(res?.data.message);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(`Error deleting product: ${error.message}`);
        setIsLoading(false);
      });
  };

  const handleCheckboxChange = (e, id) => {
    const updatedItems = proData.map((item) =>
      item._id === id
        ? {
            ...item,
            checked: e.target.checked,
          }
        : item
    );
    dispatch(setProData(updatedItems));
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a.localeCompare(b));
    setSortedIds(selectedIds);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = proData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    dispatch(setProData(updatedItems));

    if (isChecked) {
      const ids = updatedItems
        .map((item) => item._id)
        .sort((a, b) => a.localeCompare(b));
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const deleteMultipleProduct = () => {
    setIsLoading(true);
    if (sortedIds.length === 0) {
      toast.error("Please select items to delete");
      setIsLoading(false); // Stop loading if no items selected
      return;
    }
    deleteMultipleData("/api/product/deleteMultiple", {
      ids: sortedIds,
    })
      .then((res) => {
        // Axios response typically wraps data in `res.data`
        if (!res?.data?.error) {
          toast.success(res?.data?.message || "Products deleted successfully!"); // Use `res.data.message`
          fetchDataFromApi("/api/product")
            .then((fetchRes) => {
              if (!fetchRes?.error) {
                dispatch(
                  setProData(initializeProductsWithChecked(fetchRes?.data))
                );
              } else {
                toast.error("Failed to refresh product list after deletion.");
              }
            })
            .catch((error) => {
              toast.error(`Error refreshing products: ${error.message}`);
            })
            .finally(() => {
              setIsLoading(false); // Ensure loading is stopped
              setSortedIds([]); // Clear sorted IDs after successful deletion
            });
        } else {
          toast.error(
            res?.data?.message || "Something went wrong during deletion."
          ); // Use `res.data.message`
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(`Error in multiple deletion: ${error.message}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Initial data fetch on component mount
    Promise.all([
      fetchDataFromApi("/api/product"),
      fetchDataFromApi("/api/category"),
    ])
      .then(([productsRes, categoriesRes]) => {
        if (!productsRes?.error) {
          dispatch(
            setProData(initializeProductsWithChecked(productsRes?.data))
          );
          setAllProd(initializeProductsWithChecked(productsRes?.data));
        } else {
          toast.error("Failed to fetch initial products.");
        }
        if (!categoriesRes?.error) {
          dispatch(setCatData(categoriesRes?.data));
        } else {
          toast.error("Failed to fetch categories.");
        }
      })
      .catch((error) => {
        toast.error(`Initial data fetch error: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after all initial fetches
      });
  }, []);
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredProds = allProd.filter(
        (pro) =>
          pro?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.brand.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.catName.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.subCat.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.thirdSubCat.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          pro?.createdAt.includes(searchQuery)
      );
      dispatch(setProData(filteredProds));
    } else {
      dispatch(setProData(allProd));
    }
  }, [searchQuery, allProd]);
  return (
    <>
      <div className="py-3 flex flex-col md:flex-row items-start md:items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-bold">Products</h2>

        <div className="flex flex-wrap gap-3 mt-2 md:mt-0 ml-auto">
          {sortedIds?.length !== 0 && (
            <Button
              onClick={deleteMultipleProduct}
              variant="contained"
              size="small"
              color="error"
              className="btn"
            >
              Delete Selected ({sortedIds.length})
            </Button>
          )}
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
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          {/* Category Filter */}
          <div className="w-full md:w-[15%]">
            <h4 className="text-lg font-semibold mb-2">Category By</h4>
            {catData?.length > 0 && (
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
                  <MenuItem value="All">All</MenuItem>
                  {catData.map((cat) => (
                    <MenuItem key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Sub Category Filter */}
          <div className="w-full md:w-[15%]">
            <h4
              className={`text-lg font-semibold mb-2 ${
                !selectedCatObject?.children?.length && "hidden"
              }`}
            >
              Sub Category By
            </h4>
            {selectedCatObject?.children?.length > 0 && (
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
                    <MenuItem key={subCat?._id} value={subCat?._id}>
                      {subCat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Third Level Sub Category Filter */}
          <div className="w-full md:w-[20%]">
            <h4
              className={`text-lg font-semibold mb-2 ${
                !selectedSubCatObject?.children?.length && "hidden"
              }`}
            >
              Third Sub Category By
            </h4>
            {selectedSubCatObject?.children?.length > 0 && (
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
                    <MenuItem key={thirdSubCat?._id} value={thirdSubCat?._id}>
                      {thirdSubCat?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-[25%]">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="relative min-h-[400px]">
          <div
            className={`absolute inset-0 bg-white/40 ${
              isLoading ? "flex" : "hidden"
            } justify-center items-center z-50`}
          >
            <CircularProgress className="!text-primary" />
          </div>

          {proData.length !== 0 ? (
            <>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          size="small"
                          onChange={handleSelectAll}
                          checked={proData.every((item) => item.checked)}
                        />
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
                    {proData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((pro) => (
                        <TableRow key={pro._id}>
                          <TableCell>
                            <Checkbox
                              size="small"
                              checked={pro.checked || false}
                              onChange={(e) => handleCheckboxChange(e, pro._id)}
                            />
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-4">
                              <div className="img w-[55px] h-[55px] rounded-md overflow-hidden">
                                <Link to={`/product/${pro._id}`}>
                                  <img
                                    src={pro.images[0]}
                                    className="w-full"
                                    alt={pro.name}
                                  />
                                </Link>
                              </div>
                              <div className="info">
                                <h3 className="font-bold text-sm link">
                                  <Link to={`/product/${pro._id}`}>
                                    {pro.name}
                                  </Link>
                                </h3>
                                <span className="text-[12px]">
                                  {pro.thirdSubCat}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>{pro.catName}</TableCell>
                          <TableCell>{pro.subCat}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 text-[16px]">
                              <span className="line-through text-gray-500">
                                ${pro.oldPrice}
                              </span>
                              <span className="text-primary">${pro.price}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-semibold mr-2">
                              {pro.sale || 0}
                            </span>
                            Sales
                            <Progress value={pro.sale || 0} />
                          </TableCell>
                          <TableCell>
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
                count={proData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl font-light text-black/60">
                No Products Available
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
