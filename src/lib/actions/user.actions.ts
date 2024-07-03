"use server";

import { UserModal } from "../database/models/users.model";

const createUser = async (userData: any) => {
  return await UserModal.create(userData);
};

const updateUser = async (userData: any, id: any) => {
  return await UserModal.findByIdAndUpdate(id, userData, { new: true });
};

const deleteUser = async (id: any) => {
  return await UserModal.findByIdAndDelete(id);
};

export { createUser, updateUser, deleteUser };
