import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPass } from 'src/utils';
import { User } from '../schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  isEmailExisted = async (email: string): Promise<boolean> => {
    const userEmail = await this.userModel.findOne({ email }).exec();
    return !!userEmail;
  };

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async users(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    const sanitizedUsers = users.map((user) => {
      const userObject = user.toObject({ getters: true, virtuals: true });
      delete userObject.password;
      return userObject;
    });

    return sanitizedUsers;
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
      const userObject = savedUser.toObject();
      delete userObject.password;

      return userObject;
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
      const user = updatedUser.toObject();
      delete user.password;

      return user;
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
