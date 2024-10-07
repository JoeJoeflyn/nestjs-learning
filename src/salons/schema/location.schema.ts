import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Location {
  @Prop()
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
