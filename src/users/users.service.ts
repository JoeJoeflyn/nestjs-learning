import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { excludePass, hashPass } from 'src/utils';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  isEmailExisted = async (email: string) => {
    const userEmail = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (userEmail) return true;

    return false;
  };

  async findByEmail(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany({});
    return excludePass(users);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPass = await hashPass(data.password);
    const emailDuplicate = await this.isEmailExisted(data.email);

    if (emailDuplicate) {
      throw new BadRequestException('Email is existed');
    }

    try {
      const { password, ...rest } = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPass,
        },
      });
      return rest;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
