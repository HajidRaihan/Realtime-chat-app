import prisma from "../db";

const createMessage = async (chatId: string, senderId: string, content: string) => {
  const message = await prisma.message.create({
    data: {
      chatId,
      senderId,
      content,
    },
  });

  return message;
};
