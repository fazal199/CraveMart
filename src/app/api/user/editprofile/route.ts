import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";

export const PUT = TryCatchBlock(async (req: NextRequest) => {
  const { username, email, clerkId } = await req.json();

  if (!username || !email || !clerkId)
    throw new ApiError(401, "Plzz Provide All Details!");

  await dbConnect();

  const updatedUser = await UserModal.updateOne(
    { clerkId },
    {
      $set: {
        username,
        email,
        clerkId,
      },
    }
  );

  return new ApiResponse(true, "User Data Updated!", 200, updatedUser);
}, "/api/editprofile");
