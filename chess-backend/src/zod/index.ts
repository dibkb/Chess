import { Response } from "express";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(30),
  profilePic: z.string().url().optional(),
  password: z.string().min(6).max(50),
});
type SignUpBody = z.infer<typeof signUpSchema>;
const signInSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(50),
});
type SignInBody = z.infer<typeof signUpSchema>;

const handleZodParsingError = (error: unknown, res: Response) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: "invalid input",
      errors: error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }
};
const userIdSchema = z.union([z.string(), z.array(z.string())]);

const moveSchema = z.object({
  from: z.string(),
  to: z.string(),
  promotion: z.string().optional(),
});
type moveBody = z.infer<typeof moveSchema>;
export {
  signUpSchema,
  moveSchema,
  type SignUpBody,
  type SignInBody,
  type moveBody,
  signInSchema,
  handleZodParsingError,
  userIdSchema,
};
