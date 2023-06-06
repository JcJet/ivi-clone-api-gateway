import { ApiProperty } from '@nestjs/swagger';

import { MovieDto } from './movie.dto';

export class MovieResponseDto {
  @ApiProperty({ type: MovieDto })
  readonly movie: MovieDto;

  @ApiProperty()
  errors: string[];
}
