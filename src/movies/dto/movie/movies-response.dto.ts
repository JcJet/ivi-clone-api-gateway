import { ApiProperty } from '@nestjs/swagger';

import { MiniMovieDto } from './mini-movie.dto';

export class MoviesResponseDto {
  @ApiProperty({ isArray: true, type: MiniMovieDto })
  readonly result: MiniMovieDto[];

  @ApiProperty()
  readonly amount: number;
}
