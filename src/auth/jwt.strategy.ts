import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, Headers } from '@nestjs/common';
import { jwtConstants } from './constants';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const publicKey = new ConfigService(`${process.env.PWD}/.env`).getString('DB_PUBLIC_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: publicKey,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  };
}