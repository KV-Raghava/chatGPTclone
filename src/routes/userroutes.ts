import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignUp,
  verifyUser,
} from "../controllers/users-controller.js";
import {
  loginValidator,
  signUpValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manger.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
