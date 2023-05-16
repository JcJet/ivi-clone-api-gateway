import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: '1', description: 'Идентификатор автора' })
  readonly userId: number;

  @ApiProperty({ example: 'любой текст', description: 'Текст комментария' })
  readonly text: string;

  @ApiProperty({
    example: 'movies',
    description: 'Название сущности, к которой относится комментарий',
  })
  readonly essenceTable: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор элемента, к которому относится комментарий',
  })
  readonly essenceId: number;

  @ApiProperty({
    example: '2019-04-23T18:25:43.511Z',
    description: 'Дата создания комментария',
  })
  readonly creationDate: Date;
}
