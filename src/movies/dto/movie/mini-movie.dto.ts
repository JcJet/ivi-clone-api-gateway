import { ApiProperty } from '@nestjs/swagger';

import { CountryDto } from '../country.dto';
import { GenreDto } from '../genre.dto';

export class MiniMovieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;

  @ApiProperty()
  readonly poster: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly year: number;

  @ApiProperty({ type: CountryDto })
  countries: CountryDto[];

  @ApiProperty({ type: GenreDto })
  genres: GenreDto[];

  @ApiProperty()
  readonly duration: number;
}
