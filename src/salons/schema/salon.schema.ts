import { Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schema";
import { DaysOfWeek, OpeningHours } from "../entities/store.schema";
import { Feedback } from "./feedback.schema";
import { Media } from "./media.schema";
import { Location, LocationSchema } from "./location.schema";

export class Salon {
  @Prop({
    required: true,
  })
  salonName: string;

  @Prop({ type: [LocationSchema], default: [] })
  location: Location[];

  @Prop()
  phone: string;

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

const schema = SchemaFactory.createForClass(Salon);
export const SalonSchema = schema;