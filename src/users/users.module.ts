import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, {
    provide: ConfigService,
    useValue: new ConfigService(`/Users/antonkaratkevich/Desktop/Projects/nest-test/.env`),
  },],
  exports: [UsersService]
})
export class UsersModule { }
