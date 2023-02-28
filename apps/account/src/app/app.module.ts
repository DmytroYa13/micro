import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/Mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
