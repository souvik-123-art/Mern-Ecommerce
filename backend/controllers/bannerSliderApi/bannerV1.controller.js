import bannerV1Model from "../../models/bannerSliderModel/bannerV1.model.js";
import UserModel from "../../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
let imagesArr = [];
export const BannerV1ImageController = async (req, res) => {
  try {
    imagesArr = [];
    const image = req.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
    for (let i = 0; i < req?.files?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        (error, result) => {
          console.log(result);
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`backend/uploads/${req.files[i].filename}`);
          console.log(req.files[i].filename);
        }
      );
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
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
