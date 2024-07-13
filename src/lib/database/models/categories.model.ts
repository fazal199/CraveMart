import mongoose, { Schema, model } from "mongoose";

export interface CategoryInterface extends Document {
  categoryId: string;
  categoryName: string;
}

const categorySchema: Schema<CategoryInterface> = new Schema(
  {
    categoryId: {
      type: String,
      required: [true, "categoryId is required!"],
      unique: true,
      trim: true,
    },
    categoryName: {
      type: String,
      required: [true, "categoryName is required!"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategorieModal = mongoose?.models?.categories || model("categories", categorySchema);
