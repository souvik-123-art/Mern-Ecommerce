import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/", auth, getAddressController);
addressRouter.delete("/delete/:id", auth, deleteAddressController);

export default addressRouter;
