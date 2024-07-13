import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import { CategorieModal } from "@/lib/database/models/categories.model";

export const GET = TryCatchBlock(async (req: NextRequest) => {
  await dbConnect();

  const allCategories = await CategorieModal.find({});

  return new ApiResponse(true, "categories fetched!", 200, allCategories);
}, "/api/categories");
