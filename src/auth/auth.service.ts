import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService, //JwtModule 안에 있음
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //유효성 검사
    const cat = await this.catsRepository.findCatByEmail(email);

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!cat)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    else if (!isPasswordValidated)
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');

    //jwt 생성
    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
