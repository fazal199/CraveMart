import mongoose, { Schema, model } from "mongoose";

export interface UserInterface extends Document {
  username: string;
  avatar?: string;
  publicId?: string;
  email: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserInterface> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/deshu7tvf/image/upload/v1721645110/cravemart/bpmnpkdw0x7u0dykd5ga.webp",
    },
    publicId: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModal = mongoose?.models?.users || model("users", userSchema);
