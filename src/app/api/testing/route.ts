import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";

export const POST = TryCatchBlock(async (req: NextRequest) => {
  const { username, avatar, email, clerkId } = await req.json();

  await dbConnect();

  const createdUser = await UserModal.create({
    username,
    avatar,
    email,
    clerkId,
  });

  return new ApiResponse(true, "User created!", 200, createdUser);
}, "/api/testing");
