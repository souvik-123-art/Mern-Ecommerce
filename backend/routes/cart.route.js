import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToCartItemController,
  deleteCartItemController,
  emptyCartItemController,
  getCartItemController,
  updateCartItemController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartItemController);
cartRouter.get("/", auth, getCartItemController);
cartRouter.put("/update-cart/:id", auth, updateCartItemController);
cartRouter.delete("/delete-cart-item/:id", auth, deleteCartItemController);
cartRouter.delete("/empty-cart", auth, emptyCartItemController);

export default cartRouter;
