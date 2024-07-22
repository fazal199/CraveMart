import { z } from "zod";

const editProfileSchema = z.object({
  username: z
    .string({ message: "Username is Required!" })
    .min(3, { message: "Username Must be atleast 5 characters!" })
    .max(10, { message: "Username can't be more that 10 characters!" }),

});

export default editProfileSchema;
