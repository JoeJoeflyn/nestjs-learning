import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { excludePass, hashPass } from 'src/utils';
import { User } from './entities/user.entity'; // Assuming this is your Mongoose model

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: mongoose.Model<User>) { }

  isEmailExisted = async (email: string): Promise<boolean> => {
    const userEmail = await this.userModel.findOne({ email }).exec();
    return !!userEmail;
  };

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async users(): Promise<User[]> {
    const users = await this.userModel.find().lean().exec();
    return excludePass(users);
  }

  async createUser(data: Partial<User>): Promise<Omit<User, 'password'>> {
    const hashedPass = await hashPass(data.password);
    const emailDuplicate = await this.isEmailExisted(data.email);

    if (emailDuplicate) {
      throw new BadRequestException('Email already exists');
    }

    try {
      const user = new this.userModel({
        ...data,
        password: hashedPass,
      });
      const savedUser = await user.save();
      const { password, ...rest } = savedUser.toObject();
      return rest;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(
    userId: string,
    data: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, data, { new: true })
        .exec();
      const { password, ...rest } = updatedUser.toObject();
      return rest;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      return this.userModel.findByIdAndDelete(userId).exec();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
