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
  @ApiProperty({ required: true })
  @IsDefined()
  readonly nameRu: string;

  @ApiProperty({ required: true })
  @IsDefined()
  readonly nameEn: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(10, 1000)
  @IsOptional()
  readonly description: string;

  @ApiProperty({ required: true })
  @IsString({ each: true })
  @IsOptional()
  readonly countries: string[];

  @ApiProperty({ required: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly genres: number[];

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  readonly trailer: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly similarMovies: number[];

  @ApiProperty({ required: true })
  @IsNumber()
  @IsDefined()
  readonly year: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rating: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly ratingCount: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly ageRating: number;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  readonly poster: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsDefined()
  readonly duration: number;

  @ApiProperty({ required: false })
  @IsString()
  @Length(5, 100)
  @IsOptional()
  readonly slogan: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly director: number[];

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly actors: number[];

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly producer: number[];

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly cinematographer: number[];

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly screenwriter: number[];

  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly composer: number[];
}
