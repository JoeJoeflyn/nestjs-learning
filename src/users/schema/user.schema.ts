import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Prop({
    unique: true,
    lowercase: true,
    required: true,
  })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;
}

const schema = SchemaFactory.createForClass(User);

schema.virtual('fullName').get(function () {
  if (!this.firstName || !this.lastName) {
    return null;
  }

  return `${this.firstName} ${this.lastName}`;
});

export const UserSchema = schema;
