"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = exports.passwordStrengthSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
// Strong Password Regex
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Bangladeshi phone validation regex
const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
exports.passwordStrengthSchema = zod_1.default
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
})
    .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
})
    .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
})
    .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Password must contain at least one special character (@$!%*?&)",
})
    .refine((val) => strongPasswordRegex.test(val), {
    message: "Password must be strong (uppercase, lowercase, number, and special character)",
});
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
    email: zod_1.default
        .string({ error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: exports.passwordStrengthSchema,
    phone: zod_1.default
        .string({ error: "Phone number must be string" })
        .regex(bdPhoneRegex, "Invalid Bangladeshi phone number")
        .optional(),
    address: zod_1.default
        .string({ error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" })
        .optional(),
    phone: zod_1.default
        .string({ error: "Phone number must be string" })
        .regex(bdPhoneRegex, "Invalid Bangladeshi phone number")
        .optional(),
    address: zod_1.default
        .string({ error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    role: zod_1.default
        .enum(Object.values(user_interface_1.Role))
        .optional(),
    isActive: zod_1.default
        .enum(Object.values(user_interface_1.IsActive))
        .optional(),
    isDeleted: zod_1.default
        .boolean({ error: "isDeleted is required" })
        .optional(),
    isVerified: zod_1.default
        .boolean({ error: "isVerified is required" })
        .optional(),
});
