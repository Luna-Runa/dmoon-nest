import { Cat } from './../cats.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'Luna',
    description: '아이디 (MongoDB _id)',
  })
  id: string;
}
