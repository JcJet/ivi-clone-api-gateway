import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty()
  readonly nameRu: string;

  @ApiProperty()
  readonly nameEn: string;

  @ApiProperty()
  readonly role: string;

  @ApiProperty()
  readonly movies: number[];
}
