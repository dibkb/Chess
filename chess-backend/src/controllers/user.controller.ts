import { Request, Response, NextFunction } from "express";

const signUpUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, profilePic, password } = req.body();
};
export { signUpUser };
