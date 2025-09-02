import { Router } from "express";
import {
  addReview,
  changePassword,
  forgotPasswordController,
  getReview,
  loginUserController,
  loginWithGoogle,
  logoutController,
  refreshToken,
  registerUserController,
  registerWithGoogle,
  removeImageFromCloudinary,
  resetPassword,
  updateUserDetails,
  userAvatarController,
  userDetails,
  verifyEmailController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/registerWithGoogle", registerWithGoogle);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.post("/loginWithGoogle", loginWithGoogle);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/user-avatar",
  auth,
  upload.array("avatar"),
  userAvatarController
);
userRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
userRouter.put("/:id", auth, updateUserDetails);
userRouter.put("/changePassword/:id", auth, changePassword);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.get("/getReviews/:id", getReview);
userRouter.post("/addReview", auth, addReview);

export default userRouter;
