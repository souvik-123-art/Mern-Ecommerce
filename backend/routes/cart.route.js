import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartItemController } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemController);

export default cartRouter;
