import dbConnect from "@/lib/database/dbConfig";
import { UserModal } from "@/lib/database/models/users.model";
import ApiError from "@/utils/apiError";
import ApiResponse from "@/utils/apiResponse";
import TryCatchBlock from "@/utils/TryCatchBlock";
import { NextRequest } from "next/server";

export const PUT = TryCatchBlock(async(req:NextRequest) => {

 const {clerkId,imgUrl} = await req.json(); 

 if(!clerkId || !imgUrl)
    throw new ApiError(400,"Plzz Provide imgUrl and clerkId both!");

 await dbConnect();

 const user = await UserModal.findOne({clerkId});

 if(!user)
    throw new ApiError(401,"User Doesn't Exist!");

 await UserModal.findOneAndUpdate({clerkId},{avatar : imgUrl}, { new: true})

    
return new ApiResponse(true,"User Image Updated!",200,{});
},"/api/user/updateimage")

