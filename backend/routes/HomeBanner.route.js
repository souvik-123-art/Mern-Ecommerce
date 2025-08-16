import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createLargeHomeBanner,
  deleteLgHomeBanner,
  getLargeBanners,
  HomeBannerLargeImageController,
  removeImageFromCloudinary,
  updateLgHomeBanner,
} from "../controllers/bannerSliderApi/homeBanner.controller.js";

const homeBannerRouter = Router();

homeBannerRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  HomeBannerLargeImageController
);
homeBannerRouter.post("/add", auth, createLargeHomeBanner);
homeBannerRouter.get("/", getLargeBanners);
homeBannerRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
homeBannerRouter.delete("/deleteLgHomeBanner/:id", auth, deleteLgHomeBanner);
homeBannerRouter.put("/updateLgHomeBanner/:id", auth, updateLgHomeBanner);

export default homeBannerRouter;
