import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        productTitle: {
          type: String,
        },
        image: {
          type: String,
        },

        price: {
          type: Number,
        },
        size: {
          type: String,
        },
        ram: {
          type: String,
        },
        weight: {
          type: String,
        },
        subtotal: {
          type: Number,
          required: true,
        },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    // orderId: {
    //   type: String,
    //   required: [true, "Provide orderId"],
    //   unique: true,
    // },
    order_status: {
      type: String,
      default: "pending"
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
