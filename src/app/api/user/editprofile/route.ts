import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";

export const POST = TryCatchBlock(async (req: NextRequest) => {
  const { username, email, clerkId } = await req.json();

  await dbConnect();

  if (!username || !email || !clerkId)
    throw new ApiError(401, "Plzz Provide All Details!");

  const createdUser = await UserModal.updateOne(
    { clerkId },
    {
      $set: {
        username,
        email,
        clerkId,
      },
    }
  );

  return new ApiResponse(true, "User created!", 200, createdUser);
}, "/api/editprofile");
