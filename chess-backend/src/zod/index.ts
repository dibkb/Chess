import { Response } from "express";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(30),
  profilePic: z.string().url().optional(),
  password: z.string().min(6).max(100),
});
type SignUpBody = z.infer<typeof signUpSchema>;
const signInSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(100),
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
export {
  signUpSchema,
  type SignUpBody,
  type SignInBody,
  signInSchema,
  handleZodParsingError,
};
