import bannerV1Model from "../../models/bannerSliderModel/bannerV1.model.js";
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
export const BannerV1ImageController = async (req, res) => {
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

// --- Corrected createBannerV1 function ---
export const createBannerV1 = async (req, res) => {
  try {
    // Images are expected to be sent in the request body from the client
    const {
      bannerTitle,
      images,
      catId,
      subCatId,
      thirdSubCatId,
      price,
      align,
    } = req.body;

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "You need to log in first.",
        error: true,
        success: false,
      });
    }
    let bannerV1 = new bannerV1Model({
      bannerTitle,
      images,
      catId,
      subCatId,
      thirdSubCatId,
      price,
      align,
    });

    bannerV1 = await bannerV1.save();

    if (!bannerV1) {
      return res.status(500).json({
        message: "Something went wrong, banner upload failed.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Banner Uploaded Successfully",
      error: false,
      success: true,
      bannerV1,
    });
  } catch (error) {
    console.error("Banner creation error:", error);
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
        return res.status(200).json(result);
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

// --- Updated deleteBannerV1 function ---
export const deleteBannerV1 = async (req, res) => {
  try {
    const bannerV1 = await bannerV1Model.findById(req.params.id);
    if (!bannerV1) {
      return res.status(404).json({
        message: "Banner Not Available",
        error: true,
        success: false,
      });
    }

    const images = bannerV1.images;
    for (const imgUrl of images) {
      const publicId = getPublicIdFromUrl(imgUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const deleteBannerV1Result = await bannerV1Model.findByIdAndDelete(
      req.params.id
    );
    if (!deleteBannerV1Result) {
      return res.status(404).json({
        message: "Banner not found!",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Banner deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected updateBannerV1 function ---
export const updateBannerV1 = async (req, res) => {
  try {
    const {
      images,
      bannerTitle,
      catId,
      subCatId,
      thirdSubCatId,
      price,
      align,
    } = req.body;

    const bannerV1 = await bannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        images, // Use images from the request body
        bannerTitle,
        catId,
        subCatId,
        thirdSubCatId,
        price,
        align,
      },
      { new: true }
    );
    if (!bannerV1) {
      return res.status(500).json({
        message: "Banner cannot be updated",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Banner Updated",
      error: false,
      success: true,
      bannerV1,
    });
  } catch (error) {
    console.error("Banner update error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getSingleBannerV1 = async (req, res) => {
  try {
    const bannerV1 = await bannerV1Model.findById(req.params.id);
    if (!bannerV1) {
      return res.status(500).json({
        message: "The banner with the given id was not found.",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      error: false,
      success: true,
      data: bannerV1,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getBannerV1 = async (req, res) => {
  try {
    const bannerV1 = await bannerV1Model.find();
    if (!bannerV1) {
      return res.status(500).json({
        message: "something went wrong.",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data: bannerV1,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
