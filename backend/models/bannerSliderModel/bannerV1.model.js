import mongoose from "mongoose";

const bannerV1Schema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    catId: {
      type: String,
      default: "",
      required: true,
    },
    bannerTitle: {
      type: String,
      default: "",
      required: true,
    },
    align: {
      type: String,
      default: "",
      required: true,
    },
    subCatId: {
      type: String,
      default: "",
      required: true,
    },
    thirdSubCatId: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const bannerV1Model = mongoose.model("bannerV1", bannerV1Schema);
export default bannerV1Model;
