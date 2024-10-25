import express, { Request, Response } from "express";
import { findUser, loginUser, registerUser } from "./auth.service";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  const user = await findUser();
  res.json(user);
});

// router.post("register", async (req: Request, res: Response) => {
//   const user = await registerUser(req.body);
//   return res.status(200).json({
//     message: "sukses",
//     data: user,
//   });
// });

router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json({
      message: "sukses",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });

    res.json({
      data: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
