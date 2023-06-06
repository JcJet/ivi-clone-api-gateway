import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class MovieFilterDto {
  @ApiProperty({
    description:
      'Countries in short format, separated by "+". Works like operator OR, not AND (same as in Ivi).',
    example: 'ru+uk',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly countries?: string;

  @ApiProperty({
    description:
      'One year or two years separated by minus. In first case it will return movies, released in specified year.' +
      ' In second case it will return movies, released between two specified years.',
    type: 'string',
    example: '1997-2000',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly years?: string;

  @ApiProperty({
    description:
      'Returns movies with rating equal or higher, than specified. Round to one decimal.',
    type: 'number',
    example: '7.4',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly rating?: number;

  @ApiProperty({
    description:
      'Returns movies with ratings number equal or higher, than specified. Number should be divided by 1000. For example, 17200 rates should be passed as 17',
    type: 'number',
    example: '17',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly ratingCount?: number;

  @ApiProperty({
    description: 'Returns movies with specified director. Gets directors ID.',
    type: 'number',
    example: '13',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly director?: number;

  @ApiProperty({
    description: 'Returns movies with specified actor. Gets actors ID.',
    type: 'number',
    example: '130',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly actor?: number;

  genres?: string;
}
