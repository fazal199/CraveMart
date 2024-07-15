import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";
import { CartModal } from "@/lib/database/models/cart.model";
import { ProductModal } from "@/lib/database/models/products.model";

export const GET = TryCatchBlock(async (req: NextRequest) => {
  const clerkId = req.nextUrl.searchParams.get("clerkId");
  console.log(clerkId);

  if (!clerkId)
    throw new ApiError(400, "Plzz Provide clerkId aka Current User LoginId!");

  await dbConnect();

  const user = await UserModal.findOne({ clerkId });

  if (!user) throw new ApiError(400, "User Doesn't Exist!");

  const allCartProducts = await CartModal.aggregate([
    {
      $match: {
        clerkId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productData",
      },
    },
    {
      $addFields: {
        mainProductData: { $arrayElemAt: ["$productData", 0] },
      },
    },
    {
      $project: {
        productData: 0,
      },
    },
  ]);

  return new ApiResponse(true, "All Cart Data Fetched!", 200, {
    allCartProducts,
  });
}, "/api/cart/function[GET]");

export const POST = TryCatchBlock(async (req: NextRequest) => {
  const { productId, quantity, clerkId } = await req.json();

  if (!productId || !quantity || !clerkId)
    throw new ApiError(
      400,
      "plzz Provide productId, Quantity, clerkId aka current loggedIn UserId!"
    );

  await dbConnect();
  const user = await UserModal.findOne({ clerkId });

  if (!user) throw new ApiError(400, "User Doesn't Exist!");

  const product = await ProductModal.findById(productId);

  if (!product) throw new ApiError(400, "ProductId Doesn't Exist!");

  let cartItem = await CartModal.findOne({ clerkId, productId });

  //if cart item already exist then increase the quantity only
  if (cartItem) {
    cartItem.quantity += quantity;
    await CartModal.bulkSave([cartItem]);
  }

  //else will create a new cart item
  else cartItem = await CartModal.create({ productId, quantity, clerkId });

  return new ApiResponse(true, "Product Added in Cart!", 200, {
    cartItem,
  });
}, "/api/cart/function[POST]");

export const PUT = TryCatchBlock(async (req: NextRequest) => {
  const { cartItemId, quantity } = await req.json();

  if (!cartItemId) throw new ApiError(400, "plzz Provide CartId");

  await dbConnect();

  const IscartItemExist = await CartModal.findById(cartItemId);

  if (!IscartItemExist) throw new ApiError(400, "CartItem Doesn't Exist!");

  const updatedCartItem = await CartModal.findByIdAndUpdate(
    cartItemId,
    { quantity },
    { new: true }
  );

  return new ApiResponse(true, "Product Updated in Cart!", 200, {
    updatedCartItem,
  });
}, "/api/cart/function[PUT]");

export const DELETE = TryCatchBlock(async (req: NextRequest) => {
  const cartItemId = req.nextUrl.searchParams.get("cartItemId");

  if (!cartItemId) throw new ApiError(400, "plzz Provide CartId");

  await dbConnect();

  const IscartItemExist = await CartModal.findById(cartItemId);

  if (!IscartItemExist) throw new ApiError(400, "CartItem Doesn't Exist!");

  const deletedCartItem = await CartModal.findByIdAndDelete(cartItemId);

  return new ApiResponse(true, "Product Deleted from the Cart!", 200, {
    deletedCartItem,
  });
}, "/api/cart/function[DELETE]");
