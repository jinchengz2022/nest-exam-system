import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = createClient({
          socket: {
            port: 6379,
            host: 'localhost',
          },
        });
        client.connect();
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
