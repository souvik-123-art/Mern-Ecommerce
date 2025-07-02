import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./DB/connectDB.js";
import morgan from "morgan";
import helmet from "helmet";
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

connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log('server is running on port', PORT);
    
  })
})
