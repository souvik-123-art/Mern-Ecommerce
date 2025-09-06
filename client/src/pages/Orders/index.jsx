import React, { useEffect, useState } from "react";
import { AccountSidebar } from "../../components/AccountSidebar";
import Button from "@mui/material/Button";
import { TfiAngleDown } from "react-icons/tfi";
import Badge from "../../components/Badge";
import { useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
export const Orders = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orderData.orderData);
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const userDetails = useSelector((state) => state.UserDetails.userDetails); 

  const toggleOrderProduct = (idx) => {
    setIsOpenOrderProduct((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [userDetails]);
  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto flex gap-5">
        <div className="rightPart w-[20%] relative">
          <AccountSidebar />
        </div>
        <div className="rightPart w-[80%]">
          <div className="shadow-md bg-white rounded-md p-2">
            <div className="py-2 px-3 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black/70">My Orders</h2>
              <p className="mt-2 text-lg mb-6 font-light">
                There are{" "}
                <span className="font-bold text-primary">{orders?.length}</span>{" "}
                Orders
              </p>
            </div>
            <div className="relative overflow-x-scroll mt-5">
              {orders?.length !== 0 && (
                <table className="w-full text-sm text-left text-gray-500 border border-gray-300 rounded-md shadow-md">
                  <thead className="text-xs text-white uppercase bg-gray-800">
                    <tr>
                      <th className="px-6 py-3">&nbsp;</th>
                      <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Payment Id
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Name</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Address</th>
                      <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 whitespace-nowrap">Email</th>
                      <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                      <th className="px-6 py-3 whitespace-nowrap">
                        Order Status
                      </th>
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
                                  isOpenOrderProduct === idx
                                    ? "-rotate-180"
                                    : ""
                                }`}
                              >
                                <TfiAngleDown className="text-lg" />
                              </Button>
                            ) : (
                              <span>&nbsp;</span>
                            )}
                          </th>
                          <td className="px-6 py-4 text-primary font-semibold">
                            {order?._id}
                          </td>
                          <td className="px-6 py-4 text-primary font-semibold">
                            {order?.paymentId ? order?.paymentId : "null"}
                          </td>
                          <td className="px-6 py-4 text-green-500 font-semibold whitespace-nowrap">
                            {order?.payment_status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order?.userId?.name}
                          </td>
                          <td className="px-6 py-4">
                            +{order?.delivery_address?.mobile}
                          </td>
                          <td className="px-6 py-4 truncate max-w-[200px]">
                            {order?.delivery_address?.address_line}
                          </td>
                          <td className="px-6 py-4">
                            {order?.delivery_address?.pincode}
                          </td>
                          <td className="px-6 py-4 font-semibold text-primary">
                            ₹ {order?.totalAmt.toLocaleString("en-IN")}
                          </td>
                          <td className="px-6 py-4">{order?.userId?.email}</td>
                          <td className="px-6 py-4">{order?.userId?._id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge status={order?.order_status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(order?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={13} className="pl-12">
                            <Collapse
                              in={isOpenOrderProduct === idx}
                              timeout="auto"
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
                                        <th className="px-3 py-2 w-[60px]">
                                          Image
                                        </th>
                                        <th className="px-3 py-2 w-[60px]">
                                          Quantity
                                        </th>
                                        {order.products.some(
                                          (prod) => prod?.size
                                        ) && (
                                          <th className="px-3 py-2 w-[60px]">
                                            Size
                                          </th>
                                        )}
                                        {order.products.some(
                                          (prod) => prod?.ram
                                        ) && (
                                          <th className="px-3 py-2 w-[60px]">
                                            Ram
                                          </th>
                                        )}
                                        {order.products.some(
                                          (prod) => prod?.weight
                                        ) && (
                                          <th className="px-3 py-2 w-[60px]">
                                            Weight
                                          </th>
                                        )}
                                        <th className="px-3 py-2 w-[80px]">
                                          Price
                                        </th>
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
                                          {order.products.some(
                                            (p) => p?.size
                                          ) && (
                                            <td className="px-3 py-2">
                                              {prod?.size || "-"}
                                            </td>
                                          )}
                                          {order.products.some(
                                            (p) => p?.ram
                                          ) && (
                                            <td className="px-3 py-2">
                                              {prod?.ram || "-"}
                                            </td>
                                          )}
                                          {order.products.some(
                                            (p) => p?.weight
                                          ) && (
                                            <td className="px-3 py-2">
                                              {prod?.weight || "-"}
                                            </td>
                                          )}
                                          <td className="px-3 py-2">
                                            ₹
                                            {prod?.price.toLocaleString(
                                              "en-IN"
                                            )}
                                          </td>
                                          <td className="px-3 py-2">
                                            ₹
                                            {prod?.subtotal.toLocaleString(
                                              "en-IN"
                                            )}
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
        </div>
      </div>
    </section>
  );
};
