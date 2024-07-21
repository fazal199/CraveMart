import { UserModal } from "@/lib/database/models/users.model";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/dbConfig";
import ApiError from "@/utils/apiError";
import { OrderModal } from "@/lib/database/models/orders.model";
import { OrderProductsModal } from "@/lib/database/models/orderproducts.model";

export const POST = TryCatchBlock(async (req: NextRequest) => {
  const {
    clerkId,
    address,
    phoneNumber,
    totalPrice,
    cartItems,
    paymentMode,
    razorpayData,
  } = await req.json();

  if (
    !clerkId ||
    !address ||
    !phoneNumber ||
    !totalPrice ||
    !cartItems ||
    !paymentMode
  )
    throw new ApiError(400, "Plzz Provide All Details!");

  await dbConnect();

  const user = await UserModal.findOne({ clerkId });

  if (!user) throw new ApiError(400, "User Doesn't Exist!");

  let order;
  if (paymentMode == "cod") {
    order = await OrderModal.create({
      orderDate: new Date(Date.now()),
      clerkId,
      address,
      paymentMode,
      phoneNumber,
      totalPrice,
      totalProducts: cartItems.length,
    });
  } else {
    order = await OrderModal.create({
      orderDate: new Date(Date.now()),
      clerkId,
      address,
      paymentMode,
      phoneNumber,
      totalPrice,
      totalProducts: cartItems.length,
      ...razorpayData,
    });
  }

  const orderItems = cartItems?.map((item: any) => {
    item.orderId = order?._id;
    return item;
  });

  await OrderProductsModal.insertMany(orderItems);

  return new ApiResponse(true, "Order created!", 200, order);
}, "/api/orders[POST]");

export const GET = TryCatchBlock(async (req: NextRequest) => {
  const clerkId = req.nextUrl.searchParams.get("clerkId");
  let page: number = Number(req.nextUrl.searchParams.get("page"));

  if (!clerkId) throw new ApiError(400, "Plzz Provide ClerkId aka UserId!");
  if (!page) throw new ApiError(400, "Plzz Provide pageNo!");

  await dbConnect();

  const orderDetails = await OrderModal.aggregate([
    {
      $match: {
        clerkId,
      },
    },
    {
      $lookup: {
        from: "orderproducts",
        localField: "_id",
        foreignField: "orderId",
        as: "products",
      },
    },
    {
      $addFields: {
        totalProducts: {
          $size: "$products",
        },
      },
    },
    {
      $project: {
        products: 0,
      },
    },
  ])
    .limit(20)
    .skip(page * 20 - 20);

  const totalDocuments = await OrderModal.countDocuments({ clerkId });

  return new ApiResponse(true, "Order Data Fetched!", 200, {
    orderDetails,
    hasNextPage: page * 20 < totalDocuments,
    nextPage: page * 20 < totalDocuments ? page + 1 : null,
    hasPrevPage: page > 1,
    prevPage: page > 1 ? page - 1 : null,
  });
}, "/api/orders[GET]");
