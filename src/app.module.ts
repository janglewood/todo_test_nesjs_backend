import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection } from 'typeorm';
import { Users } from './users/user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "antonkaratkevich",
      database: "todo_test",
      entities: [Users]
    }),
    UsersModule
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { };
}
