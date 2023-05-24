import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly shortName: string;

  @ApiProperty()
  readonly nameEn: string;
}
