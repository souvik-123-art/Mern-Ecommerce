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
const getPublicIdFromUrl = (imgUrl) => {
  try {
    const urlParts = imgUrl.split("/upload/");
    if (urlParts.length < 2) {
      return null;
    }
    const publicIdWithExtension = urlParts[1].split("/").slice(1).join("/");
    const publicId = publicIdWithExtension.substring(
      0,
      publicIdWithExtension.lastIndexOf(".")
    );
    return publicId;
  } catch (error) {
    console.error("Error parsing Cloudinary public ID:", error);
    return null;
  }
};
export const HomeBannerLargeImageController = async (req, res) => {
  try {
    const imagesArr = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: true,
        success: false,
      });
    }

    for (const file of files) {
      const stream = streamifier.createReadStream(file.buffer);
      const result = await new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          { folder: "mern-ecommerce" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        stream.pipe(cloudinaryStream);
      });
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

// --- Corrected createLargeHomeBanner function ---
export const createLargeHomeBanner = async (req, res) => {
  try {
    // The images array is now expected to be in the request body,
    // sent by the client after a successful image upload.
    const { images } = req.body;

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "You need to log in first.",
        error: true,
        success: false,
      });
    }

    let lgBanner = new homeBannerModel({ images });

    lgBanner = await lgBanner.save();

    if (!lgBanner) {
      return res.status(500).json({
        message: "Something went wrong, banner upload failed.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Home Large Banner Uploaded Successfully",
      error: false,
      success: true,
      lgBanner,
    });
  } catch (error) {
    console.error("Home banner creation error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeImageFromCloudinary = async (req, res) => {
  try {
    const userId = req.userId;
    const imgUrl = req.query.img;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "You need to log in.",
        error: true,
        success: false,
      });
    }

    const publicId = getPublicIdFromUrl(imgUrl);

    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === "ok") {
        user.avatar = undefined;
        await user.save();
        return res.status(200).send(result);
      } else {
        return res.status(500).json({
          message: "Failed to delete image from Cloudinary.",
          error: true,
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid image URL.",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error removing image:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteLgHomeBanner = async (req, res) => {
  try {
    const lgBanner = await homeBannerModel.findById(req.params.id);
    if (!lgBanner) {
      return res.status(404).json({
        message: "Home Large Banner Not Available",
        error: true,
        success: false,
      });
    }

    const images = lgBanner.images;
    for (const img of images) {
      const publicId = getPublicIdFromUrl(img);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const deleteLargeHomeBanner = await homeBannerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteLargeHomeBanner) {
      return res.status(404).json({
        message: "Banner image not found!",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Large banner image deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting large home banner:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected updateLgHomeBanner function ---
export const updateLgHomeBanner = async (req, res) => {
  try {
    // The images array is received directly from the request body.
    const { images } = req.body;

    const lgBanner = await homeBannerModel.findByIdAndUpdate(
      req.params.id,
      { images },
      { new: true }
    );

    if (!lgBanner) {
      return res.status(500).json({
        message: "Large Home Banner cannot be updated.",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Large Home Banner Updated",
      error: false,
      success: true,
      lgBanner, // It's good practice to send back the updated document.
    });
  } catch (error) {
    console.error("Home banner update error:", error);
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