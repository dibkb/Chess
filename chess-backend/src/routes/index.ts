import express from "express";
import { signUpUser } from "../controllers/user.controller";
const router = express.Router();
// signup user
router.post("/signup", signUpUser);
export { router };
