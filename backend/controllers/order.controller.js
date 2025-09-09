import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
export const createOrderController = async (req, res) => {
  try {
    let order = new OrderModel({
      userId: req.userId,
      products: req.body.products,
      paymentId: req.body.paymentId,
      payment_status: req.body.payment_status,
      delivery_address: req.body.delivery_address,
      totalAmt: req.body.totalAmt,
      date: req.body.date,
    });
    if (!order) {
      res.status(500).json({
        error: true,
        success: false,
      });
    }

    for (let i = 0; i < req.body.products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        req.body.products[i].productId,
        {
          countInStock: parseInt(
            req.body.products[i].countInStock - req.body.products[i].quantity
          ),
          sale: parseInt(req.body.products[i].quantity),
        },
        { new: true }
      );
    }

    order = await order.save();

    return res.status(200).json({
      message: "Order Placed",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getOrderDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const orderList = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address userId");
    if (!orderList) {
      res.status(500).json({
        message: "Orders Empty",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: orderList,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllOrderDetailsController = async (req, res) => {
  try {
    const orderList = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("delivery_address userId");
    const totalOrder = await OrderModel.countDocuments();
    if (!orderList) {
      res.status(500).json({
        message: "Orders Empty",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: orderList,
      totalOrder,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateOrderDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    const user = await UserModel.findOne({
      _id: userId,
      role: "ADMIN",
    });
    if (!user) {
      return res.status(400).json({
        message: "Login first",
        error: true,
        success: false,
      });
    }
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      {
        order_status: orderStatus,
      },
      { new: true }
    );
    if (!updatedOrder) {
      res.status(400).json({
        message: "Orders can't updated",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "order status updated",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const totalSalesController = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const orderList = await OrderModel.find();

    let totalSales = 0;
    let monthlySales = [
      { name: "JAN", totalSales: 0 },
      { name: "FEB", totalSales: 0 },
      { name: "MAR", totalSales: 0 },
      { name: "APR", totalSales: 0 },
      { name: "MAY", totalSales: 0 },
      { name: "JUN", totalSales: 0 },
      { name: "JUL", totalSales: 0 },
      { name: "AUG", totalSales: 0 },
      { name: "SEP", totalSales: 0 },
      { name: "OCT", totalSales: 0 },
      { name: "NOV", totalSales: 0 },
      { name: "DEC", totalSales: 0 },
    ];

    for (let i = 0; i < orderList.length; i++) {
      totalSales += parseInt(orderList[i].totalAmt);

      const orderDate = new Date(orderList[i].createdAt);
      const year = orderDate.getFullYear();
      const month = orderDate.getMonth() + 1;

      if (currentYear === year) {
        monthlySales[month - 1].totalSales += parseInt(orderList[i].totalAmt);
      }
    }

    return res.status(200).json({
      monthlySales: monthlySales,
      totalSales: totalSales,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
