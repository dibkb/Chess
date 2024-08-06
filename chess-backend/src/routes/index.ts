import express from "express";
import { signInUser, signUpUser } from "../controllers/user.controller";
const router = express.Router();
// signup user
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
export { router };
