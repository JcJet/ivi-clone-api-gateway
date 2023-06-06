import { ApiProperty } from '@nestjs/swagger';

import { MiniMovieDto } from './mini-movie.dto';
import { PersonDto } from '../person.dto';

export class MovieDto extends MiniMovieDto {
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly trailer: string;

  @ApiProperty({ isArray: true, type: MiniMovieDto })
  readonly similarMovies: MiniMovieDto[];

  @ApiProperty()
  readonly ratingCount: number;

  @ApiProperty()
  readonly ageRating: number;

  @ApiProperty()
  readonly slogan: string;

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly director: PersonDto[];

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly actors: PersonDto[];

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly producer: PersonDto[];

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly cinematographer: PersonDto[];

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly screenwriter: PersonDto[];

  @ApiProperty({ isArray: true, type: PersonDto })
  readonly composer: PersonDto[];
}
