import prisma from "../db";
import bcrypt from "bcrypt";
import { RegisterUser, LoginUser } from "./types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const findUser = async () => {
  const user = await prisma.user.findMany();

  return user;
};

export const registerUser = async (data: RegisterUser) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new Error("Email sudah digunakan sebelumnya");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};
export const loginUser = async (creds: LoginUser) => {
  const user = await prisma.user.findUnique({ where: { email: creds.email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isValidPassword = await bcrypt.compare(creds.password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET!;

  const expiresIn = 24 * 60 * 60 * 1;

  const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

  return { user, token };
};
