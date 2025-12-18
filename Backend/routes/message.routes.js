import express from "express";
import { sendMessage, getMessages, deleteMessage, addReaction } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/:id/react", protectRoute, addReaction);
router.delete("/:id", protectRoute, deleteMessage);

export default router;
