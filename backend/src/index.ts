import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authController from "./auth/auth.controller";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();


const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authController);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
