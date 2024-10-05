import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountType, UserRole } from '../entities/user.entity';
import { enumToArray } from 'src/utils';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Prop({
    unique: true,
    lowercase: true,
    required: true,
  })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  confirmationCode: number;

  @Prop()
  codeExpired: Date;

  @Prop({ enum: enumToArray(AccountType), default: AccountType.LOCAL })
  accountType: string;

  @Prop()
  phone: string;

  @Prop({
    type: String, enum: enumToArray(UserRole), default: UserRole.USER
  })
  role: string;

  @Prop()
  isBanned: boolean;

  @Prop()
  location: string;

  @Prop()
  avatar: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

const schema = SchemaFactory.createForClass(User);

schema.virtual('fullName').get(function () {
  if (!this.firstName || !this.lastName) {
    return null;
  }

  return `${this.firstName} ${this.lastName}`;
});

export const UserSchema = schema;
