import { Request, Response } from "express";
import chatService from "./chat.service";
import { Router } from "express";
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
    const { userId } = req.body;
    const chats = await chatService.getAllChats(userId);
    res.status(200).json({ data: chats });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
