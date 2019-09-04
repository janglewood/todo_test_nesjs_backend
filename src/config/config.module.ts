import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`/Users/antonkaratkevich/Desktop/Projects/nest-test/.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule { }