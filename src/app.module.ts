import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';
import { AuthModule } from './api/auth/auth.module';
import { ProductsModule } from './api/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './api/auth/entities/user.entity';
import { ProductEntity } from './api/products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST_NAME, // or your DB host
      port: process.env.PORT ?? 8800, // PostgreSQL default port
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, ProductEntity], // Array of your entities
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([UserEntity, ProductEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
