import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsDefined()
  readonly nameRu: string;

  @ApiProperty()
  @IsDefined()
  readonly nameEn: string;

  @ApiProperty()
  @IsString()
  @Length(10, 1000)
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  readonly countries: string[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly genres: number[];

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  readonly trailer: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly similarMovies: number[];

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly year: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly rating: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly ratingCount: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly ageRating: number;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  readonly poster: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly duration: number;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  readonly slogan: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly director: number[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly actors: number[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly producer: number[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly cinematographer: number[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly screenwriter: number[];

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly composer: number[];
}
