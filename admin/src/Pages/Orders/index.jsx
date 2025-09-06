import Badge from "../../Components/Badge";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import SearchBox from "../../Components/SearchBox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "react-collapse";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import Select from "@mui/material/Select";
import { editData, fetchDataFromApi } from "../../utils/api";
import { setOrderData } from "../../redux/slices/orderSlice";
const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderData.orderData);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  const [allOrders, setAllOrders] = useState([]);


  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-gray-100 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  const handleChange = (event, orderId) => {
    const val = event.target.value;
    editData(
      `/api/order/${orderId}`,
      {
        orderStatus: val,
      },
      { credentials: true }
    ).then((res) => {
      try {
        if (!res?.data?.error) {
          toast.success(res?.data?.message);
          fetchDataFromApi("/api/order/orderList").then((response) => {
            dispatch(setOrderData(response?.data));
          });
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  const toggleOrderProduct = (idx) => {
    setIsOpenOrderProduct((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [userDetails]);

  useEffect(() => {
    // On component mount, fetch all orders and set both allOrders and Redux store
    fetchDataFromApi("/api/order/orderList").then((response) => {
      setAllOrders(response?.data || []);
      dispatch(setOrderData(response?.data || []));
    });
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredOrders = allOrders.filter(
        (order) =>
          order?._id?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          order?.userId?.name
            .toLowerCase()
            .includes(searchQuery?.toLowerCase()) ||
          order?.userId?.email
            .toLowerCase()
            .includes(searchQuery?.toLowerCase()) ||
          order?.createdAt.includes(searchQuery)
      );
      dispatch(setOrderData(filteredOrders));
    } else {
      dispatch(setOrderData(allOrders));
    }
  }, [searchQuery, allOrders]);

  return (
    <div className="card my-4 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <div className="w-[40%]">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto mt-1 pb-5">
        {orders?.length !== 0 && (
          <table className="w-full text-sm text-left text-gray-500 border border-gray-300 rounded-md shadow-md">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th className="px-6 py-3">&nbsp;</th>
                <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                <th className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                <th className="px-6 py-3 whitespace-nowrap">Payment Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                <th className="px-6 py-3 w-[200px]">Address</th>
                <th className="px-6 py-3 whitespace-nowrap">Address Type</th>
                <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                <th className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                <th className="px-6 py-3 whitespace-nowrap">Order Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order, idx) => (
                <React.Fragment key={order?._id}>
                  <tr className="bg-white border-b hover:bg-gray-50 transition">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order?.products?.length !== 0 ? (
                        <Button
                          onClick={() => toggleOrderProduct(idx)}
                          className={`!w-[35px] !h-[35px] !rounded-full bg-gray-200 transition ${
                            isOpenOrderProduct === idx ? "-rotate-180" : ""
                          }`}
                        >
                          <TfiAngleDown className="text-lg" />
                        </Button>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </th>
                    <td className="px-6 py-4 text-primary font-semibold">
                      {getHighlightedText(order._id, searchQuery)}
                    </td>
                    <td className="px-6 py-4 text-primary font-semibold">
                      {order?.paymentId ? order?.paymentId : "null"}
                    </td>
                    <td className="px-6 py-4 text-green-500 font-semibold whitespace-nowrap">
                      {order?.payment_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getHighlightedText(order.userId.name, searchQuery)}
                    </td>
                    <td className="px-6 py-4">
                      +{order?.delivery_address?.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.delivery_address?.landmark},{" "}
                      {order?.delivery_address?.address_line},{" "}
                      {order?.delivery_address?.city},{" "}
                      {order?.delivery_address?.state},
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.delivery_address?.addressType}
                    </td>
                    <td className="px-6 py-4">
                      {order?.delivery_address?.pincode}
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      ₹ {order?.totalAmt.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      {getHighlightedText(order.userId.email, searchQuery)}
                    </td>
                    <td className="px-6 py-4">{order?.userId?._id}</td>
                    <td className="px-6 py-4">
                      <Select
                        size="small"
                        value={order?.order_status}
                        onChange={(e) => handleChange(e, order?._id)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                        <MenuItem value={"dispatched"}>Dispatched</MenuItem>
                        <MenuItem value={"out for delivery"}>
                          Out For Delivery
                        </MenuItem>
                        <MenuItem value={"delivered"}>Delivered</MenuItem>
                        <MenuItem value={"cancelled"}>Canceled</MenuItem>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={13} className="pl-12">
                      <Collapse
                        isOpened={isOpenOrderProduct === idx}
                        unmountOnExit
                      >
                        <div className="overflow-x-auto py-4">
                          {order?.products?.length !== 0 && (
                            <table className="w-[1200px] text-sm text-left text-gray-500 border border-gray-300 rounded-md table-fixed">
                              <thead className="bg-gray-800 text-white">
                                <tr>
                                  <th className="px-3 py-2 w-[150px]">
                                    Product Id
                                  </th>
                                  <th className="px-3 py-2 w-[150px]">
                                    Product Title
                                  </th>
                                  <th className="px-3 py-2 w-[60px]">Image</th>
                                  <th className="px-3 py-2 w-[60px]">
                                    Quantity
                                  </th>
                                  {order.products.some(
                                    (prod) => prod?.size
                                  ) && (
                                    <th className="px-3 py-2 w-[60px]">Size</th>
                                  )}
                                  {order.products.some((prod) => prod?.ram) && (
                                    <th className="px-3 py-2 w-[60px]">Ram</th>
                                  )}
                                  {order.products.some(
                                    (prod) => prod?.weight
                                  ) && (
                                    <th className="px-3 py-2 w-[60px]">
                                      Weight
                                    </th>
                                  )}
                                  <th className="px-3 py-2 w-[80px]">Price</th>
                                  <th className="px-3 py-2 w-[80px]">
                                    Subtotal
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {order.products.map((prod, index) => (
                                  <tr
                                    key={index}
                                    className="bg-white border-b hover:bg-gray-100"
                                  >
                                    <td className="px-3 py-2 truncate">
                                      {prod?.productId}
                                    </td>
                                    <td className="px-3 py-2 truncate max-w-[150px]">
                                      {prod?.productTitle}
                                    </td>
                                    <td className="px-3 py-2">
                                      <img
                                        src={prod?.image}
                                        alt="product"
                                        className="w-[40px] h-[40px] object-cover rounded-md"
                                      />
                                    </td>
                                    <td className="px-3 py-2">
                                      {prod?.quantity}
                                    </td>
                                    {order.products.some((p) => p?.size) && (
                                      <td className="px-3 py-2">
                                        {prod?.size || "-"}
                                      </td>
                                    )}
                                    {order.products.some((p) => p?.ram) && (
                                      <td className="px-3 py-2">
                                        {prod?.ram || "-"}
                                      </td>
                                    )}
                                    {order.products.some((p) => p?.weight) && (
                                      <td className="px-3 py-2">
                                        {prod?.weight || "-"}
                                      </td>
                                    )}
                                    <td className="px-3 py-2">
                                      ₹{prod?.price.toLocaleString("en-IN")}
                                    </td>
                                    <td className="px-3 py-2">
                                      ₹{prod?.subtotal.toLocaleString("en-IN")}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
