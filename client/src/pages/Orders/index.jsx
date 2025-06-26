import React, { useState } from "react";
import { AccountSidebar } from "../../components/AccountSidebar";
import Button from "@mui/material/Button";
import { TfiAngleDown } from "react-icons/tfi";
import Badge from "../../components/Badge";
export const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
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
                There are <span className="font-bold text-primary">2 </span>
                Orders
              </p>
            </div>
            <div className="relative overflow-x-scroll mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-white uppercase bg-gray-800 border border-gray-700">
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
                  <tr className="bg-white border border-gray-400">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      Souvik Sarkar
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">7000494543</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      sdfsdfisdifshdifhsidhfsdhfsdifisdhfisdifisdfsdifisdfidsifisd
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">700049</td>
                    <td className="px-6 py-4 whitespace-nowrap">2499/-</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Souvik@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      sda344dfsdsdf
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status="delivered" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">23.01.2025</td>
                  </tr>
                  {isOpenOrderProduct === 0 && (
                    <tr>
                      <td colSpan={6} className="pl-20">
                        <div className="relative overflow-x-scroll">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-white uppercase bg-gray-800 border border-gray-700">
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
                              <tr className=" bg-white border border-gray-400">
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                  2
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                              </tr>
                              <tr className=" bg-white border border-gray-400">
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                  2
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className="bg-white border border-gray-400">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      Souvik Sarkar
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">7000494543</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      sdfsdfisdifshdifhsidhfsdhfsdifisdhfisdifisdfsdifisdfidsifisd
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">700049</td>
                    <td className="px-6 py-4 whitespace-nowrap">2499/-</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Souvik@gmail.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      sda344dfsdsdf
                    </td>
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
                            <thead className="text-xs text-white uppercase bg-gray-800 border border-gray-700">
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
                              <tr className=" bg-white border border-gray-400">
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                  2
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                              </tr>
                              <tr className=" bg-white border border-gray-400">
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                  2
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  $25
                                </td>
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
        </div>
      </div>
    </section>
  );
};
