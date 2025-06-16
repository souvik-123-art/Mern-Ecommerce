import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
import { connectDB } from "./DB/connectDB.js";
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
  connectDB();
});
