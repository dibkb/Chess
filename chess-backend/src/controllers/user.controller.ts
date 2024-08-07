import { Request, Response, NextFunction } from "express";
import { Types } from "../types";
import {
  type SignUpBody,
  type SignInBody,
  signUpSchema,
  signInSchema,
  handleZodParsingError,
} from "../zod";
import { prisma } from "..";
import { comparePassword, getHash } from "../service/bcrypt";
import { getUserByUsername } from "../service/user.service";
import { makeToken } from "../service/jwt";

// signup-user
const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody: SignUpBody = signUpSchema.parse(req.body);
    const { username, password, profilePic } = validatedBody;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json("Username already exits");
    }
    const hash = getHash(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash,
        ...(profilePic && { profilePic }),
      },
    });
    return res.status(201).json({
      message: "Account successfully signed in",
      payload: {
        user: {
          id: newUser.id,
          username: newUser.username,
          profilePic: newUser.profilePic,
        },
      },
    });
  } catch (error) {
    handleZodParsingError(error, res);
    next(error);
  }
};

//signin user
const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password }: SignInBody = signInSchema.parse(req.body);

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Username does not exist" });
    }

    const isPasswordValid = comparePassword({
      hash: user.password,
      unhash: password,
    });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // JWT login logic
    const token = makeToken({
      id: user.id,
      username: user.username,
    });
    return res.status(200).json({
      message: "Successfully logged in",
      payload: {
        token,
        user: {
          id: user.id,
          username: user.username,
          profilePic: user.profilePic,
        },
      },
    });
  } catch (err) {
    handleZodParsingError(err, res);
    next(err);
  }
};
export { signUpUser, signInUser };
