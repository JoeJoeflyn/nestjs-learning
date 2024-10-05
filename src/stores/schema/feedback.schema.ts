import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Types } from "mongoose";
import { User } from "src/users/schema";
import { Store } from "./store.schema";

@Schema()
export class Feedback {
  @Prop({ type: Number, min: 1, max: 5 })
  rating: string;

  @Prop({ type: String })
  review: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: Store.name })
  storeId: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
