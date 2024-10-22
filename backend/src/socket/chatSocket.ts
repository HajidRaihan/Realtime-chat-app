import { Server, Socket } from "socket.io";

const chatSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log("tetrrrtrtrt", chatId);
    });

    socket.on("sendMessage", (data) => {
      const { chatId, content } = data;
      io.to(chatId).emit("newMessage", content);
    });
  });
};

export default chatSocketHandler;
