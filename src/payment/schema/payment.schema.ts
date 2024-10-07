import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { enumToArray } from 'src/utils';
import { Currency, Status } from '../entities/payment.schema';

@Schema()
export class Payment {
  @Prop()
  amount: number;

  @Prop({ required: true, enum: enumToArray(Currency), default: Currency.USD })
  currency: string;

  @Prop(raw({
    type: { type: String },
    provider: { type: String }
  }))
  paymentMethod: Record<string, any>;

  @Prop({ required: true, enum: enumToArray(Status), default: Status.PENDING })
  status: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop()
  description: string;

  @Prop(raw({
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  }))
  billingAddress: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
