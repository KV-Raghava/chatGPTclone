import { Router } from "express";
import { verifyToken } from "../utils/token-manger.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controller.js";

const chatRoutes = Router();

chatRoutes.get("/user", (req, res) => {});
chatRoutes.post("/new", 
validate(chatCompletionValidator), 
verifyToken,
generateChatCompletion);
chatRoutes.get("/all-chats", 
verifyToken,
sendChatsToUser
);
chatRoutes.delete("/delete", 
    verifyToken,
    deleteChats
);
export default chatRoutes;
