import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//strategy의 validate 실행
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
