import mongoose, { Schema, model } from "mongoose";

export interface OrderInterface extends Document {
  orderDate: Date;
  clerkId: string;
  paymentMode: string;
  deliveryStatus: string;
  address: string;
  phoneNumber: string;
  totalPrice: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<OrderInterface> = new Schema(
  {
    orderDate: {
      type: Date,
      required: [true, "orderDate is Required!"],
      default: new Date(Date.now()),
    },
    clerkId: {
      type: String,
      required: [true, "clerkId is Required!"],
      trim: true,
    },
    paymentMode: {
      type: String,
      required: [true, "Payment is required!"],
      trim: true,
    },
    deliveryStatus: {
      type: String,
      lowercase: true,
      default: "pending",
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "PhoneNumber is required!"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "totalPrice is required!"],
      trim: true,
    },
    razorpay_order_id: {
      type: String,
      default: "not online",
      lowercase: true,
      trim: true,
    },
    razorpay_payment_id: {
      type: String,
      default: "not online",
      lowercase: true,
      trim: true,
    },
    razorpay_signature: {
      type: String,
      default: "not online",
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModal =
  mongoose?.models?.orders || model("orders", orderSchema);
