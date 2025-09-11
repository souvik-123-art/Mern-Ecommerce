import homeBannerModel from "../../models/bannerSliderModel/homeBanner.model.js";
import UserModel from "../../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload

export const HomeBannerLargeImageController = async (req, res) => {
  try {
    const imagesArr = [];
    const files = req.files;

    // Check if files exist to avoid errors
    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: true,
        success: false,
      });
    }

    // Loop through each file uploaded by multer
    for (const file of files) {
      // Create a readable stream from the file's in-memory buffer
      const stream = streamifier.createReadStream(file.buffer);

      // Wrap the upload process in a Promise to use async/await
      const result = await new Promise((resolve, reject) => {
        // Use Cloudinary's upload_stream method to handle the upload
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          {
            folder: "mern-ecommerce", // Optional: Organize uploads in a specific folder
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        // Pipe the stream from memory directly to Cloudinary
        stream.pipe(cloudinaryStream);
      });

      // Push the secure URL of the uploaded image to the array
      imagesArr.push(result.secure_url);
    }

    return res.status(200).json({
      images: imagesArr,
      success: true,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      message: error.message || "An error occurred during the upload process.",
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
