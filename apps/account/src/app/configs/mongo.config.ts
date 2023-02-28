import { MongooseModuleAsyncOptions } from '@nestjs/Mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configeService: ConfigService) => ({
      uri: getMongoString(configeService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};

const getMongoString = (configService: ConfigService) => {
  'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_DATABASE') +
    '?authSource=' +
    configService.get('MONGO_AUTHDATABASE');
};
