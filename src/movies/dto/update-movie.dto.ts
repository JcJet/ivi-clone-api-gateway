import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
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

  @ApiProperty()
  countries: string;

  @ApiProperty()
  genres: number[];

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly trailer: string;

  @ApiProperty()
  readonly similarMovies: number[];

  @ApiProperty()
  readonly ratingCount: number;

  @ApiProperty()
  readonly ageRating: number;

  @ApiProperty()
  readonly slogan: string;

  @ApiProperty()
  readonly director: number[];

  @ApiProperty()
  readonly actors: number[];

  @ApiProperty()
  readonly producer: number[];

  @ApiProperty()
  readonly cinematographer: number[];

  @ApiProperty()
  readonly screenwriter: number[];

  @ApiProperty()
  readonly composer: number[];
}
