import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import {
  type SignUpBody,
  type SignInBody,
  signUpSchema,
  signInSchema,
  handleZodParsingError,
  userIdSchema,
} from "../zod";
import { prisma } from "..";
import { comparePassword, getHash } from "../service/bcrypt";
import { getUserByUserId, getUserByUsername } from "../service/user.service";
import { makeToken } from "../service/jwt";

// signup-user
const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody: SignUpBody = signUpSchema.parse(req.body);
    const { username, password, profilePic } = validatedBody;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res
        .status(409)
        .json("Username is taken. Please choose another one");
    }
    const hash = getHash(password);
    let cloudinaryLinkPic;
    if (profilePic) {
      const newprofile = await cloudinary.uploader.upload(profilePic);
      cloudinaryLinkPic = newprofile.secure_url;
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash,
        profilePic: cloudinaryLinkPic,
      },
    });
    return res.status(201).json({
      message: "Account successfully signed up",
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
      return res.status(401).json("Username does not exist");
    }

    const isPasswordValid = comparePassword({
      hash: user.password,
      unhash: password,
    });
    if (!isPasswordValid) {
      return res.status(401).json("Invalid password");
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

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIds = userIdSchema.parse(req.query.userId);
    if (!userIds) {
      return res.status(401).json("No userId provided");
    }
    let userData;
    if (typeof userIds === "string") {
      userData = await Promise.resolve(getUserByUserId(userIds));
    } else {
      userData = await Promise.all(userIds.map((id) => getUserByUserId(id)));
    }

    return res.status(200).json({
      users: userData,
    });

    //
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({
      message: error.message,
      name: error.name,
    });
  }
};
export { signUpUser, signInUser, getUserInfo };
