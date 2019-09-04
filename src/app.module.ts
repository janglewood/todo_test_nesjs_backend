import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
          type: 'postgres' as 'postgres',
          host: configService.getString('TYPEORM_HOST'),
          port: Number(configService.getString('TYPEORM_PORT')),
          username: configService.getString('TYPEORM_USERNAME'),
          database: configService.getString('TYPEORM_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "antonkaratkevich",
      // database: "todo_test",
      // entities: [Users]
    }),
    UsersModule,
    AuthModule,
    ConfigModule
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { };
}
