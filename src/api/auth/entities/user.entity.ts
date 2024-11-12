// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = UserEntity & Document;

// @Schema({ timestamps: true })
// export class UserEntity {
//   @Prop()
//   name: string;

//   @Prop({ unique: [true, 'This Email Already Used try with another email!'] })
//   email: string;

//   @Prop()
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(UserEntity);

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
