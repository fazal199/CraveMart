import mongoose, { Schema, model } from "mongoose";

export interface CartInterface extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<CartInterface> = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: [true, "ProductId is required!"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Email is required!"],
      trim: true,
    },
    clerkId: {
      required: [true, "UserId aka ClerkId is Required!"],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const CartModal =
  mongoose?.models?.cartusers || model("cartusers", cartSchema);
