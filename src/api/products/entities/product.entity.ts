import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = ProductEntity & Document;

@Schema({ timestamps: true })
export class ProductEntity {
  @Prop()
  title: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
