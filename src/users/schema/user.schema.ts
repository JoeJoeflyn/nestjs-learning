import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Payment } from 'src/payment/schema/payment.schema';
import { Feedback } from 'src/salons/schema/feedback.schema';
import { Salon } from 'src/salons/schema/salon.schema';
import { enumToArray } from 'src/utils';
import { AccountType, UserRole } from '../entities/user.entity';
import { Notification } from 'src/notifications/schema/notification.schema';

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

  @Prop()
  fingerprint: string;

  @Prop()
  faceId: string;

  @Prop({ type: Types.ObjectId, ref: Salon.name })
  salonId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: Feedback.name })
  feedbackId: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: Payment.name })
  paymentId: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: Notification.name })
  notificationId: [Types.ObjectId];
}

const schema = SchemaFactory.createForClass(User);

schema.virtual('fullName').get(function () {
  if (!this.firstName || !this.lastName) {
    return null;
  }

  return `${this.firstName} ${this.lastName}`;
});

export const UserSchema = schema;