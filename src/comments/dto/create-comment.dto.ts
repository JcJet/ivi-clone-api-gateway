import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: `{"userId": 1, "name": "Nebuchadnezzar"}`,
    description: 'Автор комментария',
  })
  readonly author: {
    readonly userId: number;
    readonly name: string;
  };

  @ApiProperty({ example: 'любой текст', description: 'Текст комментария' })
  readonly text: string;

  @ApiProperty({
    example: '2019-04-23T18:25:43.511Z',
    description: 'Дата создания комментария',
  })
  readonly date: Date;
}

