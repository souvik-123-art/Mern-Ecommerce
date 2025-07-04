import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../config/sendEmail.js";
import genAccessToken from "../utils/genAccessToken.js";
import genRefreshToken from "../utils/genRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }
    const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        message: "user already exists",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      verifyCode,
      verifyCodeExpires: Date.now() + 600000,
    });
    await user.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    await sendVerificationEmail(user.email, verifyCode);
    return res.status(200).json({
      success: true,
      message: "user Created Successfully",
      token: token,
      error: false,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({
      verifyCode: code,
      verifyCodeExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or expired verification code",
        error: true,
      });
    }
    user.isVerified = true;
    user.verifyCode = undefined;
    user.verifyCodeExpires = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    return res.status(200).json({
      success: true,
      error: false,
      message: "user verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        success: false,
        error: true,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "invalid credentials" });
    }
    const accesstoken = genAccessToken(user._id);
    const refreshtoken = await genRefreshToken(user._id);
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);
    return res.json({
      message: "login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const logoutController = async (req, res) => {
  try {
    const userId = req.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });
    return res.json({
      message: "logout successfully",
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

//image upload
let imagesArr = [];
export const userAvatarController = async (req, res) => {
  try {
    let imagesArr = [];
    const userId = req.userId;
    const image = req.files;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "you nedd to login",
        error: true,
        success: false,
      });
    }
    const imgUrl = user.avatar;
    const urlArr = imgUrl.split("/");
    const avatarImage = urlArr[urlArr.length - 1];

    const imageName = avatarImage.split(".")[0];

    if (imageName) {
      const result = await cloudinary.uploader.destroy(imageName);
    }

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

    user.avatar = imagesArr[0];
    await user.save();
    return res.status(200).json({
      _id: userId,
      avatar: imagesArr[0],
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
      user.avatar = undefined;
      await user.save();
      return res.status(200).send(result);
    }
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        message: "you nedd to login",
        error: true,
        success: false,
      });
    }
    let verifyCode = "";
    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }
    let hashedPassword = "";
    if (password) {
      hashedPassword = bcrypt.hash(password, 10);
    } else {
      hashedPassword = userExist.password;
    }
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        mobile,
        email,
        isVerified: email !== userExist.email ? false : true,
        password: hashedPassword,
        verifyCode: verifyCode !== "" ? verifyCode : null,
        verifyCodeExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );
    if (email !== userExist.email) {
      await sendVerificationEmail(email, verifyCode);
    }
    return res.status(200).json({
      message: "user updated successfully",
      error: false,
      success: true,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
