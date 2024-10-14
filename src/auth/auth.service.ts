import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDetails } from 'src/utils/type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);

    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    console.log({ user });
    if (user) return user;
    console.log('User not found. Creating...');

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
      },
    });
    

    return newUser;
  }

  async findUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
