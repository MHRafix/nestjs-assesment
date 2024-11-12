import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './api/auth/entities/user.entity';
import { AuthModule } from './api/auth/auth.module';
import { ProductsModule } from './api/products/products.module';
import { ProductEntity } from './api/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8888,
      password: '590749',
      username: 'postgres',
      entities: [UserEntity, ProductEntity], // here we have added user enitity in entities array
      database: 'bitbyte-assesment-db',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
