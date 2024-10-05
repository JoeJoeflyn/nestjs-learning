import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Store } from './store.schema';

@Schema()
export class Media {
  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop({ type: Types.ObjectId, ref: Store.name })
  storeId: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
