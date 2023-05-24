import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;
}
