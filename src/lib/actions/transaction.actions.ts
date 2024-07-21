"use server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string,
});
export const makePayment = async (amount: number) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(2, 15),
    });

    return order;
  } catch (error: any) {
    console.log(error);
    console.log(
      "something went wrong while making payment in transaction.actions.ts"
    );
    return undefined;
  }
};
