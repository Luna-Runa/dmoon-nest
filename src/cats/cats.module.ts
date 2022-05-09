import { CommentsSchema, Comments } from './../comments/comments.schema';
import { AuthModule } from './../auth/auth.module';
import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { CatsRepository } from './cats.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({ dest: './upload' }),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule), //양쪽에서 순환참조를 하기 때문
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
