import { Router} from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/users-controller.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup",validate(signUpValidator), userSignUp);
userRoutes.post("/login",validate(loginValidator), userLogin);
export default userRoutes