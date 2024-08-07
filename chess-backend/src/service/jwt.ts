import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { type User } from "@prisma/client";

dotenv.config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";
type MakeToken = Omit<
  User,
  "password" | "profilePic" | "createdAt" | "updatedAt"
>;
const makeToken = (payload: MakeToken) => {
  const token = jwt.sign(payload, ENCRYPTION_KEY, { expiresIn: "3d" });
  return token;
};
export { makeToken };
