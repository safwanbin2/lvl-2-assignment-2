"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationUpdateSchema = exports.userValidationSchema = exports.orderValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fullNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string().max(15),
    lastName: zod_1.default.string().max(15),
});
const fullNameValidationUpdateSchema = zod_1.default.object({
    firstName: zod_1.default.string().max(15),
    lastName: zod_1.default.string().max(15),
});
const addressValidationSchema = zod_1.default.object({
    street: zod_1.default.string(),
    city: zod_1.default.string(),
    country: zod_1.default.string().min(3).max(30),
});
const addressValidationUpdateSchema = zod_1.default.object({
    street: zod_1.default.string(),
    city: zod_1.default.string(),
    country: zod_1.default.string().min(3).max(30),
});
exports.orderValidationSchema = zod_1.default.object({
    productName: zod_1.default.string(),
    price: zod_1.default.number(),
    quantity: zod_1.default.number().min(1),
});
exports.userValidationSchema = zod_1.default.object({
    userId: zod_1.default.number(),
    username: zod_1.default.string(),
    password: zod_1.default.string().min(2).max(20),
    fullName: fullNameValidationSchema,
    age: zod_1.default.number().min(10).max(100),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean(),
    hobbies: zod_1.default.array(zod_1.default.string()),
    address: addressValidationSchema,
});
exports.userValidationUpdateSchema = zod_1.default.object({
    userId: zod_1.default.number().optional(),
    username: zod_1.default.string().optional(),
    password: zod_1.default.string().min(2).max(20).optional(),
    fullName: fullNameValidationUpdateSchema.optional(),
    age: zod_1.default.number().min(10).max(100).optional(),
    email: zod_1.default.string().email().optional(),
    isActive: zod_1.default.boolean().optional(),
    hobbies: zod_1.default.array(zod_1.default.string()).optional(),
    address: addressValidationUpdateSchema.optional(),
});
