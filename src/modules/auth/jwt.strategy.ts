import { env } from '../../config/env';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false, //for development
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log(payload, 'JwtStrategy');
    if (!payload.email) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
