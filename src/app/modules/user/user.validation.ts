import z from "zod";

// Strong Password Regex
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Bangladeshi phone validation regex
const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;


export const passwordStrengthSchema = z
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
          message:"Password must be strong (uppercase, lowercase, number, and special character)",
     });


export const createUserZodSchema = z.object({

     name: z.
          string({ error: "Name must be string" })
          .min(2, {message: "Name must be at least 2 characters long" })
          .max(50, {message: "Name must be at most 50 characters long" }),
     email: z
          .string({ error: "Email must be string" })
          .email({ message: "Invalid email address format." })
          .min(5, { message: "Email must be at least 5 characters long." })
          .max(100, { message: "Email cannot exceed 100 characters." }),
     password: passwordStrengthSchema,


})