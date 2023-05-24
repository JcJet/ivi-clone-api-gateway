import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly countries: string[];

  @ApiProperty()
  readonly genres: number[];

  @ApiProperty()
  readonly trailer: string;

  // @ApiProperty({ isArray: true, type: MiniMovieDto })
  // readonly similarMovies: MiniMovieDto[];

  @ApiProperty()
  readonly year: number;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly ratingCount: number;

  @ApiProperty()
  readonly ageRating: number;

  @ApiProperty()
  readonly poster: string;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly slogan: string;

  // @ApiProperty()
  // readonly director: PersonDto[];
  //
  // @ApiProperty()
  // readonly actors: PersonDto[];
  //
  // @ApiProperty()
  // readonly producer: PersonDto[];
  //
  // @ApiProperty()
  // readonly cinematographer: PersonDto[];
  //
  // @ApiProperty()
  // readonly screenwriter: PersonDto[];
  //
  // @ApiProperty()
  // readonly composer: PersonDto[];
}
