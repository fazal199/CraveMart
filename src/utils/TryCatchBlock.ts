import { NextRequest, NextResponse } from "next/server";

const TryCatchBlock =
  (func: any, placeName: string) => async (request: NextRequest) => {
    try {
      const response = await func(request);
      return NextResponse.json(response);
    } catch (error: any) {
      console.log(`Something Went wrong in ${placeName} route`);
      console.log(error?.message);
      return NextResponse.json({
        data: error?.data || {},
        message: error?.message || "Something went wrong!",
        statusCode: error?.statusCode || 500,
        success: false,
      });
    }
  };

export default TryCatchBlock;
