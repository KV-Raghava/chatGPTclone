import { Router } from "express";
import userRoutes from "./userroutes.js";
import chatRoutes from "./chatroutes.js";

const appRouter = Router();

appRouter.use("/users", userRoutes);
appRouter.use("/chats",chatRoutes);
export default appRouter;