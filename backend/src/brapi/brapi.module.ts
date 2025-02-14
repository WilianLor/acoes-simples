import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BrapiService } from './services/brapi.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('brapi.baseUrl'),
        headers: {
          Authorization: `Bearer ${configService.getOrThrow('brapi.token')}`,
        },
      }),
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 600000000000,
    }),
  ],
  providers: [BrapiService],
  exports: [BrapiService],
})
export class BrapiModule {}
