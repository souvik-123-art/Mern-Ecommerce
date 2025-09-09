import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getAllOrderDetailsController,
  getOrderDetailsController,
  totalSalesController,
  updateOrderDetailsController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/", auth, getOrderDetailsController);
orderRouter.get("/orderList", auth, getAllOrderDetailsController);
orderRouter.put("/:id", auth, updateOrderDetailsController);
orderRouter.get("/totalSales", auth, totalSalesController);

export default orderRouter;
