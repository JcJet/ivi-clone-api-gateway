import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;
}
