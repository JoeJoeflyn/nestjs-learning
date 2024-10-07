import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Media {
  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];
}

export const MediaSchema = SchemaFactory.createForClass(Media);
