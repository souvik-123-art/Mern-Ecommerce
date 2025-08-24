import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./DB/connectDB.js";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import myListRouter from "./routes/myList.route.js";
import addressRouter from "./routes/address.route.js";
import homeBannerRouter from "./routes/HomeBanner.route.js";
import bannerV1Router from "./routes/bannerV1.route.js";
import blogRouter from "./routes/blog.route.js";
app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = process.env.PORT || 7000;
app.get("/", (req, res) => {
  res.json("hi");
});
app.use("/api/user", userRouter);
app.use("/api/address", addressRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/homeBanners", homeBannerRouter);
app.use("/api/bannerV1", bannerV1Router);
app.use("/api/blog", blogRouter);
app.use("/api/cart", cartRouter);
app.use("/api/myList", myListRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
});
