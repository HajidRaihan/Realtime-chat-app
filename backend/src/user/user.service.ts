import prisma from "../db";
import bcrypt from "bcrypt";

const findUser = async () => {
  return await prisma.user.findMany();
};

const findActiveUser = async (userId: string, username?: string) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
      ...(username && { username: { contains: username, mode: "insensitive" } }), // Pencarian username jika parameter diberikan
    },
    select: {
      id: true,
      username: true,
      avatar: true,
      // Tambahkan atribut lain yang ingin disertakan
    },
  });
};

export default {
  findUser,
  findActiveUser,
};
