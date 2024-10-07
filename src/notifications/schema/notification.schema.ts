import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Notification {
  @Prop({ required: true })
  title: string; // Title of the notification (e.g., "You've received a bonus!")

  @Prop({ required: true })
  summary: string; // Short content or summary of the notification

  @Prop({ required: true })
  content: string;

  @Prop()
  isRead: boolean;

  @Prop({ default: true })
  isPublished: boolean;

  @Prop()
  coverImage: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);