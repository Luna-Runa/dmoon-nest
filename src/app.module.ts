import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }), //환경변수를 사용하기 위해, 모든 모듈에서 import, 캐시로 속도향상
    MongooseModule.forRoot(process.env.MONGODB_URI, { useCreateIndex: true }),
    CatsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//미들웨어. NestModule 인터페이스를 implements
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //모든 엔드포인터에
    mongoose.set('debug', process.env.MODE === 'dev' ? true : false);
  }
}
