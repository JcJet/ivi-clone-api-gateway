import { MovieDto } from './movie.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({ type: MovieDto })
  readonly movie: MovieDto;

  @ApiProperty()
  errors: string[];
}
