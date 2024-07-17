import { z } from "zod";

const checkoutSchema = z.object({
  address: z
    .string({ message: "Address is Required!" })
    .min(10, { message: "Address should alteast contain 10 characters!" })
    .max(100, { message: "Address can't be more than 50 characters!" })
    .trim(),

  phoneno: z
    .string({ message: "Phone Number is Required!" })
    .trim()
    .min(10, { message: "phone number must contain only 10 digits!" })
    .max(10, { message: "phone number can't be more than 10 digits!" })
    .regex(/^[6789]\d{9}$/, { message: "Invalid phone number!" }),

  paymentMethod: z.string({ message: "Payment Method is Required!" }),
});

export default checkoutSchema;