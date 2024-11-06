import prisma from "../db";

const createChat = async (senderId: string, receiverId: string) => {
  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  // Jika chat sudah ada, kembalikan chat yang sudah ada
  if (existingChat) {
    return existingChat;
  }

  // Jika belum ada, buat chat baru
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
    const partner = userId === chat.sender.id ? chat.receiver : chat.sender;
    const lastMessage = chat.Message.length > 0 ? chat.Message[0] : null;

    return {
      chatId: chat.id,
      partner: {
        id: partner.id,
        username: partner.username,
        avatar: partner.avatar,
      },
      lastMessage: lastMessage
        ? {
            content: lastMessage.content,
            createdAt: lastMessage.createdAt,
            isUserMessage: lastMessage.senderId === userId, // true jika pesan milik user
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

  // if (!chat) {
  //   throw new Error("chat not found");
  // }

  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  const chatHistory = messages.map((message) => ({
    messageId: message.id,
    content: message.content,
    sender: {
      id: message.sender.id,
      username: message.sender.username,
      avatar: message.sender.avatar,
    },
    isUserMessage: userId === message.sender.id,
    createdAt: message.createdAt,
  }));

  return chatHistory;
};

const getChatDetail = async (userId: string, chatId: string) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
    },
    include: {
      sender: true,
      receiver: true,
      Message: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (chat) {
    chat.Message = chat.Message.map((message) => ({
      ...message,
      isUserMessage: message.senderId === userId,
    }));
  }

  return chat;
};

export default {
  createChat,
  getUserChat,
  getAllChats,
  getPrivateChatHistory,
  getChatDetail,
};
