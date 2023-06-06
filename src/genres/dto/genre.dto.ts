import { ApiProperty } from '@nestjs/swagger';

import { CreateGenreDto } from './create-genre.dto';

export class GenreDto extends CreateGenreDto {
  @ApiProperty()
  readonly id: number;
}
