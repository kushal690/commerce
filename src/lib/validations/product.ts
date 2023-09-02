import { z } from "zod";

export const uploadProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Must be at least 1 character" })
    .max(50, { message: "Must be less than 50 characters" }),
  description: z.string().optional(),
  price: z
    .number()
    .min(1, { message: "Must be at least 1" })
    .max(1000000, { message: "Must be less than 1,000,000" }),
  quantity: z
    .number()
    .min(1, { message: "Must be at least 1" })
    .max(1000000, { message: "Must be less than 1,000,000" }),
  category: z
    .string()
    .min(1, { message: "Must be at least 1 character" })
    .max(50, { message: "Must be less than 50 characters" }),
  subCategory: z
    .string()
    .min(1, { message: "Must select subcategory" })
    .max(50, { message: "Must be less than 50 characters" }),
});