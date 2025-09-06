import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createOrderController,
  getAllOrderDetailsController,
  getOrderDetailsController,
  updateOrderDetailsController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/", auth, getOrderDetailsController);
orderRouter.get("/orderList", auth, getAllOrderDetailsController);
orderRouter.put("/:id", auth, updateOrderDetailsController);

export default orderRouter;
