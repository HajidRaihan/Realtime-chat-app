import { Server, Socket } from "socket.io";

const chatSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log("tetrrrtrtrt", chatId);
    });

    socket.on("leaveRoom", (chatId: string) => {
      socket.leave(chatId);
      console.log(`User left room: ${chatId}`);
    });

    socket.on("sendMessage", (data) => {
      const { chatId, senderId, content } = data;
      console.log("Sending message to chat room:", chatId, "with content:", content);
      io.to(chatId).emit("newMessage", { senderId, content }); // Mengirim content yang tepat
    });
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

export default chatSocketHandler;
