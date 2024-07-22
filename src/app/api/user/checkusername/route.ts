import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";

export const GET = TryCatchBlock(async (req: NextRequest) => {
  const username = req.nextUrl.searchParams.get("username");

  if (!username) throw new ApiError(400, "Plzz Provide UserName!");

  await dbConnect();

  const user = await UserModal.findOne({ username });
 

  if (user) {
    if (user.username == username)
      return new ApiResponse(true, "Username is Available!", 200, {});

    throw new ApiError(400, "Username is not available!");
  }

  return new ApiResponse(true, "Username is Available!", 200, {});
}, "/api/user/checkusername");
