import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  BannerV1ImageController,
  createBannerV1,
  deleteBannerV1,
  getBannerV1,
  getSingleBannerV1,
  removeImageFromCloudinary,
  updateBannerV1,
} from "../controllers/bannerSliderApi/bannerV1.controller.js";

const bannerV1Router = Router();

bannerV1Router.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  BannerV1ImageController
);
bannerV1Router.post("/add", auth, createBannerV1);
bannerV1Router.get("/", getBannerV1);
bannerV1Router.get("/:id", getSingleBannerV1);
bannerV1Router.delete("/deleteImage", auth, removeImageFromCloudinary);
bannerV1Router.delete("/deleteBannerV1/:id", auth, deleteBannerV1);
bannerV1Router.put("/updateBannerV1/:id", auth, updateBannerV1);

export default bannerV1Router;
