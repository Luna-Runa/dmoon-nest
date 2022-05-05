import { CatsRepository } from './../../cats/cats.repository';
import { Payload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

//jwt 전략 guard -> strategy자동실행 -> validate
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Bearer토큰을 Auth헤더에서 추출 추출
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY, //이 키로 디코딩
    });
  }

  //유효성 검증
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) return cat; //req.user
    else throw new UnauthorizedException('접근 오류');
  }
}
