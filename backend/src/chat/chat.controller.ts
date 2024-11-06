import { Request, Response } from "express";
import chatService from "./chat.service";
import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";
const router = Router();

router.post("/create", verifyUser(), async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;

    const chat = await chatService.createChat(req.user?.toString() || "", receiverId);
    res.status(201).json(chat);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to create chat" });
  }
});

router.get("/getAll", verifyUser(), async (req: Request, res: Response) => {
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

    const chatHistory = await chatService.getPrivateChatHistory(req.user || "", chatId);
    res.status(200).json({ data: chatHistory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getUserChat", verifyUser(), async (req: Request, res: Response) => {
  try {
    const chat = await chatService.getUserChat(req.user || "");
    res.status(200).json({ data: chat });
  } catch (error) {
    console.log(error);
  }
});

router.get("/detail/:chatId", verifyUser(), async (req: Request, res: Response) => {
  const { chatId } = req.params;
  try {
    const chat = await chatService.getChatDetail(req.user || "", chatId);
    res.status(200).json({
      data: {
        isSender: req.user === chat?.sender.id,
        ...chat,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
