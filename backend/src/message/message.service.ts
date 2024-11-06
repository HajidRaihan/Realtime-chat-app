import prisma from "../db";

const createMessage = async (chatId: string, senderId: string, content: string) => {
  // return console.log(chatId, senderId, content);
  const message = await prisma.message.create({
    data: {
      chatId,
      senderId,
      content,
    },
  });

  return message;
};

export default {
  createMessage,
};
