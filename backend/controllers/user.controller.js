import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
import {
  resetSuccessEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../config/sendEmail.js";
import genAccessToken from "../utils/genAccessToken.js";
import genRefreshToken from "../utils/genRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import reviewModel from "../models/reviews.model.js";
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, mobile, panel } = req.body;
    if (!name || !email || !password || !mobile) {
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
      mobile,
      password: hashedPassword,
      name,
      verifyCode,
      verifyCodeExpires: Date.now() + 600000,
      role: panel === "admin" ? "ADMIN" : "USER",
    });
    await user.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    await sendVerificationEmail(user.email, verifyCode);
    return res.status(200).json({
      success: true,
      message: "User Created Successfully.Please verify your email!",
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
export const registerWithGoogle = async (req, res) => {
  const { name, email, mobile, avatar, password, signUpWithGoogle, panel } =
    req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (
      existUser &&
      ((panel === "admin" && existUser.role === "ADMIN") ||
        (panel === "client" && existUser.role === "USER"))
    ) {
      return res.status(400).json({
        message: "user already exists",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.create({
      name,
      email,
      avatar,
      mobile,
      password,
      signUpWithGoogle,
      role: panel === "admin" ? "ADMIN" : "USER",
      isVerified: true,
      last_login_date: new Date(),
    });
    const accesstoken = genAccessToken(user._id);
    const refreshtoken = await genRefreshToken(user._id);
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);
    return res.status(200).json({
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
  const { email, password, panel } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "invalid credentials" });
    }
    // ✅ Role-based restriction
    if (panel === "admin" && user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Admin Not Found! please create account first.",
      });
    }

    if (panel === "client" && user.role !== "USER") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "User Not Found! please create account first.",
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        success: false,
        error: true,
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "your email is not verified yet please verify your email first",
        success: false,
        error: true,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "something went wrong" });
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
export const loginWithGoogle = async (req, res) => {
  const { email, panel } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "invalid credentials" });
    }
    // ✅ Role-based restriction
    if (panel === "admin" && user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Admin Not Found! please create account first.",
      });
    }
    if (panel === "client" && user.role !== "USER") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "User Not Found! please create account first.",
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        success: false,
        error: true,
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "your email is not verified yet please verify your email first",
        success: false,
        error: true,
      });
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
    imagesArr = [];
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
    const { name, email, mobile } = req.body;
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
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        mobile,
        email,
        isVerified: email !== userExist.email ? false : true,
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
      user: {
        name: updateUser?.name,
        _id: updateUser?._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
        isVerified: updateUser?.isVerified,
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

export const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        message: "you nedd to login",
        error: true,
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      userExist.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "old password did not matched",
      });
    }
    let hashedPassword = "";
    hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "password changed successfully",
      error: false,
      success: true,
      user: {
        name: updateUser?.name,
        _id: updateUser?._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
        isVerified: updateUser?.isVerified,
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

//forgot password
export const forgotPasswordController = async (req, res) => {
  const { email, panel } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    // generate reset token

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    let baseUrl;
    if (panel === "admin") {
      baseUrl = process.env.ADMIN_URL;
    } else {
      baseUrl = process.env.CLIENT_URL;
    }

    const resetLink = `${baseUrl}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(user.email, resetLink);
    res.status(200).json({
      success: true,
      error: false,
      message: "password reset link sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired reset token" });
    // update password
    const hashedPass = await bcrypt.hash(password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await resetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      error: false,
      message: "Password reset succesfully",
    });
  } catch (error) {
    console.log("Error in reset Password ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "token is expired",
      });
    }
    const userId = verifyToken.id;
    const newAccessToken = genAccessToken(userId);
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "new access token generated",
      error: false,
      success: true,
      data: {
        accesstoken: newAccessToken,
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

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId)
      .select("-password -refresh_token")
      .populate("address_details");
    return res.json({
      message: "user details",
      data: user,
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
export const allUserDetails = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password -refresh_token")
      .populate("address_details");
    const usersCount = await UserModel.countDocuments();
    return res.json({
      message: "user details",
      data: users,
      usersCount,
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

export const addReview = async (req, res) => {
  try {
    const { image, userName, review, rating, productId } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "you need to login first",
        error: true,
        success: false,
      });
    }
    const userReview = new reviewModel({
      image,
      userName,
      review,
      rating,
      userId,
      productId,
    });
    await userReview.save();
    return res.status(200).json({
      message: "review added",
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
export const getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await reviewModel.find({
      productId: id,
    });

    if (!reviews) {
      return res.status(500).json({
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: reviews,
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

export const totalUsersController = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    let monthlyUsers = [
      {
        name: "JAN",
        totalUsers: 0,
      },
      {
        name: "FEB",
        totalUsers: 0,
      },
      {
        name: "MAR",
        totalUsers: 0,
      },
      {
        name: "APR",
        totalUsers: 0,
      },
      {
        name: "MAY",
        totalUsers: 0,
      },
      {
        name: "JUN",
        totalUsers: 0,
      },
      {
        name: "JUL",
        totalUsers: 0,
      },
      {
        name: "AUG",
        totalUsers: 0,
      },
      {
        name: "SEP",
        totalUsers: 0,
      },
      {
        name: "OCT",
        totalUsers: 0,
      },
      {
        name: "NOV",
        totalUsers: 0,
      },
      {
        name: "DEC",
        totalUsers: 0,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = {
          name: "JAN",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = {
          name: "FEB",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = {
          name: "MAR",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = {
          name: "APR",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = {
          name: "MAY",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = {
          name: "JUN",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = {
          name: "JUL",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = {
          name: "AUG",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = {
          name: "SEP",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = {
          name: "OCT",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = {
          name: "NOV",
          totalUsers: users[i].count,
        };
      }
      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = {
          name: "DEC",
          totalUsers: users[i].count,
        };
      }
    }

    return res.status(200).json({
      totalUsers: monthlyUsers,
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
