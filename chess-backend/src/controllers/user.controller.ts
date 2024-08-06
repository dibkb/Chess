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
      return res.status(409).json({ message: "username already exits" });
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
      message: "account successfully signed in",
      newUser,
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
      return res.status(401).json({ message: "invalid username" });
    }

    const isPasswordValid = comparePassword({
      hash: user.password,
      unhash: password,
    });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid password" });
    }
    // JWT login logic
    const token = makeToken({
      id: user.id,
      username: user.username,
    });
    res.cookie(Types.ACCESS_TOKEN, token, {
      maxAge: 60 * 60 * 24 * 3,
    });
    return res.status(200).json({
      message: "successfully logged in",
      user: {
        id: user.id,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    handleZodParsingError(err, res);
    next(err);
  }
};
export { signUpUser, signInUser };
