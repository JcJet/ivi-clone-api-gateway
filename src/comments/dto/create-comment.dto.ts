import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';

class Author {
  userId: number;
  readonly name: string;
}

export class CreateCommentDto {
  @ApiProperty({
    example: `{"userId": 1, "name": "Nebuchadnezzar"}`,
    description: 'Автор комментария',
  })
  @IsDefined()
  readonly author: Author;

  @IsDefined()
  @IsString()
  @Length(10, 1000)
  @ApiProperty({ example: 'любой текст', description: 'Текст комментария' })
  readonly text: string;
}
