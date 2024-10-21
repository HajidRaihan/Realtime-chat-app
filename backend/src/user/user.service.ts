import prisma from "../db";
import bcrypt from "bcrypt";

const findUser = async () => {
    return await prisma.user.findMany()
}

