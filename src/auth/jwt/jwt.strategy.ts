import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

//jwt 전략 guard -> strategy자동실행 -> validate
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더에 토큰으로 추출
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY, //이 키로 디코딩
    });
  }

  /* //jwt 유효성 검증
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  } */
}
