import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  nameRu: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty({ description: 'URL to photo image', required: false })
  photo?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  biography?: string;
}
