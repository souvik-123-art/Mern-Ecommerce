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

export const createBannerV1 = async (req, res) => {
  try {
    const user = UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "You Need To Login First",
        error: true,
        success: false,
      });
    }
    let bannerV1 = new bannerV1Model({
      bannerTitle: req.body.bannerTitle,
      images: req.body.images,
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      thirdSubCatId: req.body.thirdSubCatId,
      price: req.body.price,
      align: req.body.align,
    });
    if (!bannerV1) {
      return res.status(500).json({
        message: "something went wrong, banner upload failed.",
        error: true,
        success: false,
      });
    }
    bannerV1 = await bannerV1.save();
    imagesArr = [];
    return res.status(200).json({
      message: " Banner Uploaded Successfully",
      error: false,
      success: true,
      bannerV1,
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
export const deleteBannerV1 = async (req, res) => {
  try {
    const bannerV1 = await bannerV1Model.findById(req.params.id);
    if (!bannerV1) {
      return res.status(400).json({
        message: " Banner Not Available",
        error: true,
        success: false,
      });
    }
    const images = bannerV1.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }

    const deletebannerV1 = await bannerV1Model.findByIdAndDelete(req.params.id);
    if (!deletebannerV1) {
      res.status(404).json({
        message: "banner not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: " banner deleted",
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
export const updateBannerV1 = async (req, res) => {
  try {
    const bannerV1 = await bannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
        bannerTitle: req.body.bannerTitle,
        catId: req.body.catId,
        subCatId: req.body.subCatId,
        thirdSubCatId: req.body.thirdSubCatId,
        price: req.body.price,
        align: req.body.align,
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
    imagesArr = [];
    res.status(200).json({
      message: " Banner Updated",
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
