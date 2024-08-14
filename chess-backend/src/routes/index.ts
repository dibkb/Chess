import express from "express";
import {
  signInUser,
  signUpUser,
  getUserInfo,
} from "../controllers/user.controller";
const router = express.Router();
// signup user
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.get("/user-info", getUserInfo);
export { router };
