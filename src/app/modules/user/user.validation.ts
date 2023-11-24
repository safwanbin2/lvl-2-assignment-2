import z from "zod";

const fullNameValidationSchema = z.object({
  firstName: z.string().max(15),
  lastName: z.string().max(15),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string().min(3).max(30),
});

export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().min(2).max(20),
  fullName: fullNameValidationSchema,
  age: z.number().min(10).max(100),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});

export const userValidationUpdateSchema = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().min(2).max(20).optional(),
  fullName: fullNameValidationSchema.optional(),
  age: z.number().min(10).max(100).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema.optional(),
});
