import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 1000,
      isGlobal: true,
    }),
  ],
})
export class AppCacheModule {}