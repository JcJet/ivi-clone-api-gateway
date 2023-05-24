import { ApiProperty } from '@nestjs/swagger';

export class MovieFilterDto {
  @ApiProperty({
    description:
      'Countries in short format, separated by "+". Works like operator OR, not AND (same as in Ivi).',
    example: 'ru+uk',
    required: false,
    type: 'string',
  })
  readonly countries?: string;

  @ApiProperty({
    description:
      'One year or two years separated by minus. In first case it will return movies, released in specified year.' +
      ' In second case it will return movies, released between two specified years.',
    type: 'string',
    example: '1997-2000',
    required: false,
  })
  readonly years?: string;

  @ApiProperty({
    description:
      'Returns movies with rating equal or higher, than specified. Round to one decimal.',
    type: 'number',
    example: '7.4',
    required: false,
  })
  readonly rating?: number;

  @ApiProperty({
    description:
      'Returns movies with ratings number equal or higher, than specified.',
    type: 'number',
    example: '17920',
    required: false,
  })
  readonly ratingCount?: number;

  // @ApiProperty({
  //   description: 'Returns movies with specified director. Gets directors ID.',
  //   type: 'number',
  //   example: '13',
  //   required: false,
  // })
  readonly director?: number;

  // @ApiProperty({
  //   description: 'Returns movies with specified actor. Gets actors ID.',
  //   type: 'number',
  //   example: '130',
  //   required: false,
  // })
  readonly actor?: number;
}
