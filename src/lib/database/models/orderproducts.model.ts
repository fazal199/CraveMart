import mongoose, { Schema, model } from "mongoose";

export interface OrderProductsInterface extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  orderId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderProductsSchema: Schema<OrderProductsInterface> = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: [true, "ProductId is Required!"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required!"],
      trim: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: [true, "OrderId is Required!"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderProductsModal =
  mongoose?.models?.orderproducts ||
  model("orderproducts", orderProductsSchema);
