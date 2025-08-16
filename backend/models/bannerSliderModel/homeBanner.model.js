import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const homeBannerModel = mongoose.model("homeBanner", homeBannerSchema);
export default homeBannerModel;
