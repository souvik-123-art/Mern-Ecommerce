import homeBannerModel from "../../models/bannerSliderModel/homeBanner.model.js";
import UserModel from "../../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
let imagesArr = [];
export const HomeBannerLargeImageController = async (req, res) => {
  try {
    let imagesArr = [];
    const image = req.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.uploader.upload(image[i].path, options);

      imagesArr.push(result.secure_url);

      // Temporary file delete after successful upload
      fs.unlinkSync(`backend/uploads/${image[i].filename}`);
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const createLargeHomeBanner = async (req, res) => {
  try {
    const user = UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "You Need To Login First",
        error: true,
        success: false,
      });
    }
    let lgBanner = new homeBannerModel({
      images: req.body.images,
    });
    if (!lgBanner) {
      return res.status(500).json({
        message: "something went wrong, banner upload failed.",
        error: true,
        success: false,
      });
    }
    lgBanner = await lgBanner.save();
    imagesArr = [];
    return res.status(200).json({
      message: "Home Large Banner Uploaded Successfully",
      error: false,
      success: true,
      lgBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getLargeBanners = async (req, res) => {
  try {
    const lgBanners = await homeBannerModel.find();
    if (!lgBanners) {
      return res.status(500).json({
        message: "something went wrong.",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data: lgBanners,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeImageFromCloudinary = async (req, res) => {
  const userId = req.userId;
  const imgUrl = req.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "you nedd to login",
      error: true,
      success: false,
    });
  }

  const imageName = image.split(".")[0];

  if (imageName) {
    const result = await cloudinary.uploader.destroy(imageName);
    if (result) {
      return res.status(200).send(result);
    }
  }
};
export const deleteLgHomeBanner = async (req, res) => {
  try {
    const lgBanner = await homeBannerModel.findById(req.params.id);
    if (!lgBanner) {
      return res.status(400).json({
        message: "Home Large Banner Not Available",
        error: true,
        success: false,
      });
    }
    const images = lgBanner.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }

    const deleteLargeHomeBanner = await homeBannerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteLargeHomeBanner) {
      res.status(404).json({
        message: "banner image not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "large banner image deleted",
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
export const updateLgHomeBanner = async (req, res) => {
  try {
    const lgBanner = await homeBannerModel.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
      },
      { new: true }
    );
    if (!lgBanner) {
      return res.status(500).json({
        message: "large Home Banner cannot be updated",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    res.status(200).json({
      message: "large Home Banner Updated",
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
