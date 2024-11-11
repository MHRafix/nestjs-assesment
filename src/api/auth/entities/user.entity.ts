import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema({ timestamps: true })
export class UserEntity {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'This Email Already Used try with another email!'] })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
