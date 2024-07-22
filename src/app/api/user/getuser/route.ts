import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";

export const GET = TryCatchBlock(async (req: NextRequest) => {
  const clerkId = req.nextUrl.searchParams.get("clerkId");

  await dbConnect();

  if (!clerkId) throw new ApiError(401, "Plzz Provide All Details!");

  const user = await UserModal.findOne(
    { clerkId },
    { _id: 0, createdAt: 0, updatedAt: 0 }
  );

  if (!user) throw new ApiError(401, "Plzz Give Correct clerkId aka userId!");

  return new ApiResponse(true, "User Data Fetched!", 200, user);
}, "/api/getuser");
