import mongoose, { Schema, model } from "mongoose";

export interface ProductInterface extends Document {
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count?: number };
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<ProductInterface> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Email is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    rating: {
      rate: {
        type: Number,
        required: true,
        trim: true,
      },
      count: {
        type: Number,
        trim: true,
      },
    },
    categoryId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModal =
  mongoose?.models?.products || model("products", productSchema);
