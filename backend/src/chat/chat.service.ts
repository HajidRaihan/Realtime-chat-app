import prisma from "../db";

const createChat = async (senderId: string, receiverId: string) => {
  const existingChat = await prisma.chat.findFirst({
    where: {
      senderId: senderId,
      receiverId: receiverId,
    },
  });

  if (existingChat) {
    return existingChat;
  }

  return await prisma.chat.create({
    data: {
      senderId,
      receiverId,
    },
  });
};

const getUserChat = async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      receiver: true,
      sender: true,
    },
  });

  if (!chats) {
    throw new Error("chat is not found");
  }

  return chats;
};

export default {
  createChat,
  getUserChat,
};
