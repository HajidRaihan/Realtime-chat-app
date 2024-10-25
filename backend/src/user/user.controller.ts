import { Request, Response } from "express";
import userService from "./user.service";
import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

const router = Router();

router.get("/active", verifyUser(), async (req: Request, res: Response) => {
  const { username } = req.query;
  try {
    const user = await userService.findActiveUser(req.user || "", username?.toString());

    res.status(200).json({
      message: "berhasil menemukan user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
