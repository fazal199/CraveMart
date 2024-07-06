"use server";

import dbConnect from "../database/dbConfig";
import { UserModal } from "../database/models/users.model";

const createUser = async (userData: any) => {
  await dbConnect();
  return await UserModal.create(userData);
};

const updateUser = async (userData: any, id: any) => {
  await dbConnect();
  return await UserModal.findByIdAndUpdate(id, userData, { new: true });
};

const deleteUser = async (id: any) => {
  await dbConnect();
  return await UserModal.findByIdAndDelete(id);
};

export { createUser, updateUser, deleteUser };
