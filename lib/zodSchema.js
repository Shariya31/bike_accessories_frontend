import { z } from "zod";
import { SIZE_VALUES } from "./utils";
import { numberField } from "./helperFunction";

export const zSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),

  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be a 6 digit number"
  }),
  _id: z.string().min(3, '_id is required'),
  alt: z.string().min(3, 'Alt is required'),
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'slug is required'),
  category: z.string().min(3, 'Please select a category'),
  mrp: numberField({ label: "MRP", positive: true }),
  sellingPrice: numberField({ label: "Selling price", positive: true }),
  discountPercentage: numberField({ label: "Discount percentage", min: 1, max: 100 }),
  description: z.string().min(3, 'Description is required'),

  product: z.string().min(1, "Please select a product"),

  sku: z
    .string()
    .trim()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU is too long"),

  color: z
    .string()
    .trim()
    .min(2, "Color is required")
    .max(30, "Color is too long"),

  size: z.enum(SIZE_VALUES, { message: "Please select a valid size" }),
  code: z.string().min(3, 'Code is required'),
  minShoppingAmount: numberField({ label: "Minimum shopping amount", min: 0 }),
  validity: z.coerce.date().refine(d => d > new Date(), "Validity must be in the future")
});