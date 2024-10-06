import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schema';

@Schema()
export class Location {
  @Prop({ type: String })
  address: string;

  @Prop({
    type: {
      lon: { type: Number },
      lat: { type: Number },
    },
  })
  coordinates: {
    lon: number;
    lat: number;
  };
}

export const LocationSchema = SchemaFactory.createForClass(Location);
