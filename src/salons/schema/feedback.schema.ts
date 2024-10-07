import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Feedback {
  @Prop({ type: Number, min: 1, max: 5 })
  rating: number;

  @Prop()
  review: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
