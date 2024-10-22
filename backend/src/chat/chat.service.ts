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

const getAllChats = async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      receiver: true,
      sender: true,
      Message: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  const formattedChat = chats.map((chat) => {
    return {
      chatId: chat.id,
      participants: {
        sender: {
          id: chat.sender.id,
          username: chat.sender.username,
          avatar: chat.sender.avatar,
        },
        receiver: {
          id: chat.receiver.id,
          username: chat.receiver.username,
          avatar: chat.receiver.avatar,
        },
      },
      lastMessage:
        chat.Message.length > 0
          ? {
              content: chat.Message[0].content,
              createdAt: chat.Message[0].createdAt,
            }
          : null,
    };
  });

  return formattedChat;
};

const getPrivateChatHistory = async (userId: string, chatId: string) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });

  if (!chat) {
    throw new Error("chat not found");
  }

  //! lanjotttt
};

export default {
  createChat,
  getUserChat,
  getAllChats,
};
