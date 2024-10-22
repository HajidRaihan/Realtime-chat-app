import { Request, Response } from "express";
import messageService from "./message.service";
import { Router } from "express";
const router = Router();

router.post("message", async (req: Request, res: Response) => {
  try {
    const { chatId, senderId, content } = req.body;

    const message = await messageService.createMessage(chatId, senderId, content);

    res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error });
  }
});
