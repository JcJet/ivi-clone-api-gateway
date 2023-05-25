import { CreateGenreDto } from './create-genre.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GenreDto extends CreateGenreDto {
  @ApiProperty()
  readonly id: number;
}
