"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fullNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string().max(15),
    lastName: zod_1.default.string().max(15),
});
const addressValidationSchema = zod_1.default.object({
    street: zod_1.default.string(),
    city: zod_1.default.string(),
    country: zod_1.default.string().min(3).max(30),
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