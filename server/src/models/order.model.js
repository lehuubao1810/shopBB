import mongoose from "mongoose";

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        // required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    email: {
        type: String,
        required: true,
      },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "processing", "shipping", "delivered"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      enum: ["COD", "Banking"],
      default: "COD",
    },
    note: {
        type: String,
        default: "",
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

const Order = mongoose.model(DOCUMENT_NAME, orderSchema);
export default Order;
