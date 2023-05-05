import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly country: string[];

  @ApiProperty()
  readonly director: string;

  @ApiProperty()
  readonly actors: string[];

  @ApiProperty()
  readonly produced: string;

  @ApiProperty()
  readonly cinematographer: string;

  @ApiProperty()
  readonly screenwriter: string;

  @ApiProperty()
  readonly composer: string[];

  @ApiProperty()
  readonly genres: string[];

  @ApiProperty()
  readonly trailer: string;

  @ApiProperty()
  readonly similarMovies: number[];

  @ApiProperty()
  readonly startYear: number;

  @ApiProperty()
  readonly endYear: number;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly ratingCount: number;

  @ApiProperty()
  readonly imageUrl: string; //  нужна только маленькая картинка, в API кинопоиска posterUrlPreview

  // @ApiProperty()
  // readonly reviews: IviReview[]; TODO

  @ApiProperty()
  readonly reviewCount: number;

  @ApiProperty()
  readonly duration: string; // в минутах, либо в строке оставить "113 минут"
}
