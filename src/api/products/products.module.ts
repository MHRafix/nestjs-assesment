import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
