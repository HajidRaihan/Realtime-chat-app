import { Request, Response } from "express";
import chatService from "./chat.service";
import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";
const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.body;
    const chat = await chatService.createChat(senderId, receiverId);
    res.status(201).json(chat);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to create chat" });
  }
});

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const chats = await chatService.getAllChats(req.user || "");
    res.status(200).json({ data: chats });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

interface ChatParams {
  chatId: string;
}

router.get("/history/:chatId", verifyUser(), async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const chatHistory = await chatService.getPrivateChatHistory(chatId, req.user || "");
    res.status(200).json({ data: chatHistory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
