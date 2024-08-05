import { Request, Response, NextFunction } from "express";
import { type SignUpBody, signUpSchema } from "../zod";
import { z } from "zod";
import { prisma } from "..";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody: SignUpBody = signUpSchema.parse(req.body);
    const { username, password, profilePic } = validatedBody;
    await prisma.user.create({
      data: {
        username,
        password,
        ...(profilePic && { profilePic }),
      },
    });
    return res.status(201).json({
      message: "account successfully signed in",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "invalid input",
        errors: error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
    next(error);
  }
};
export { signUpUser };
