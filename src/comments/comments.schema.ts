import { ApiProperty } from '@nestjs/swagger';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, //DB에서 핸들링 단계에선 Mongoose의 ObjectId
    required: true,
    ref: 'cats', //참조할 DB
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ default: 0 })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '작성할 대상 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, //DB에서 핸들링 단계에선 Mongoose의 ObjectId
    required: true,
    ref: 'cats', //참조할 DB
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
