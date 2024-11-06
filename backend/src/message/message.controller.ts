import { Request, Response } from "express";
import messageService from "./message.service";
import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";
const router = Router();

router.post("/:chatId", verifyUser(), async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const message = await messageService.createMessage(req.params.chatId, req.user || "", content);

    res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error });
  }
});

export default router;
