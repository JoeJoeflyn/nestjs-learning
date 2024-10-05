import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schema";
import { DaysOfWeek, OpeningHours } from "../entities/store.schema";
import { Feedback } from "./feedback.schema";
import { Media } from "./media.schema";

export class Store {
  @Prop({
    required: true,
  })
  salonName: string;

  @Prop()
  location: string;

  @Prop()
  coverImage: string;

  @Prop({
    type: Map,
    of: {
      open: { type: Date },
      close: { type: Date },
    },
  })
  openingHours: Map<DaysOfWeek, OpeningHours>;

  @Prop({ type: [Types.ObjectId], ref: Feedback.name })
  feedbackId: string[];

  @Prop({ type: Types.ObjectId, ref: Media.name })
  mediaId: string[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string;
}

const schema = SchemaFactory.createForClass(Store);
export const StoreSchema = schema;