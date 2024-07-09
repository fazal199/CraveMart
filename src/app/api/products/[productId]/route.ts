import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";
import { ProductModal } from "@/lib/database/models/products.model";

export const GET = TryCatchBlock(async (req: NextRequest, params: any) => {
  const { productId } = params;

  if (!productId) throw new ApiError(400, "ProductId is Required!");

  await dbConnect();

  //fetching the main product
  const mainProduct = await ProductModal.findById(productId);

  //if the main product doesnot exist!
  if (!mainProduct) throw new ApiError(404, "Product not found");

  //fetching the similarProducts
  const similarProducts = await ProductModal.find({
    categoryId: mainProduct.categoryId,
  }).limit(9);

  return new ApiResponse(true, "Product Data Fetched!", 200, {
    mainProduct,
    similarProducts,
  });
}, "/api/products/productId");
