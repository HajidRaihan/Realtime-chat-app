import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authController from "./auth/auth.controller";
import chatController from "./chat/chat.controller";
import messageController from "./message/message.controller";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import chatSocketHandler from "./socket/chatSocket";
import cors from "cors";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Atur cors sesuai kebutuhan, di sini dibuka untuk semua origin
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // Use CORS middleware

const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authController);
app.use("/api/chat", chatController);
app.use("/api/message", messageController);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

chatSocketHandler(io);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
