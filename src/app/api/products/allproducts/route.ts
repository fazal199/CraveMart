import dbConnect from "@/lib/database/dbConfig";
import { ProductModal } from "@/lib/database/models/products.model";
import ApiError from "@/utils/apiError";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";

export const GET = TryCatchBlock(async (req: NextRequest) => {
  await dbConnect();

  let page: number = Number(req.nextUrl.searchParams.get("page"));

  let filterPrice: string | number | null =
    req.nextUrl.searchParams.get("price");
  let categories: string | null | Array<string> =
    req.nextUrl.searchParams.get("categories");

  if (!page) throw new ApiError(400, "Plzz Provide the page No!");

  //if the price is not provided
  if (!filterPrice) filterPrice = 0;
  else filterPrice = Number(filterPrice);

  //handle categories
  if (!categories) categories = [];
  else
    categories = categories
      ?.replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll(",", "")
      .trim()
      .split("");

  let productsData;

  //if the categories are provided
  if (categories?.length != 0) {
    productsData = await ProductModal.find({
      categoryId: { $in: categories },
      price: { $gte: filterPrice },
    })
      .limit(9)
      .skip(page * 9 - 9);
  }

  //if the categories are not provided
  else {
    productsData = await ProductModal.find({ price: { $gte: filterPrice } })
      .limit(9)
      .skip(page * 9 - 9);
  }

  const totalDocuments = await ProductModal.countDocuments({});

  return new ApiResponse(true, "Product Data Sent Successfully!", 200, {
    productsData,
    hasNextPage: page * 9 < totalDocuments,
    nextPage: page * 9 < totalDocuments ? page + 1 : null,
    hasPrevPage: page > 1,
    prevPage: page > 1 ? page - 1 : null,
  });
}, "/api/products/allproducts");
