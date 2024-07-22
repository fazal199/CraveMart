import cloudinaryInstance from "@/lib/cloudinary/cldConfig";
import dbConnect from "@/lib/database/dbConfig";
import { UserModal } from "@/lib/database/models/users.model";
import ApiError from "@/utils/apiError";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";

export const PUT = TryCatchBlock(async (req: NextRequest) => {
  const { clerkId, imgUrl, publicId } = await req.json();

  if (!clerkId || !imgUrl || !publicId)
    throw new ApiError(400, "Plzz Provide imgUrl,PublicId and clerkId both!");

  await dbConnect();

  const user = await UserModal.findOne({ clerkId });

  if (!user) throw new ApiError(401, "User Doesn't Exist!");

  if (user.publicId) {
    await cloudinaryInstance.uploader.destroy(publicId as string);
  }

  await UserModal.findOneAndUpdate(
    { clerkId },
    { avatar: imgUrl },
    { new: true }
  );

  return new ApiResponse(true, "User Image Updated!", 200, {});
}, "/api/user/updateimage");
