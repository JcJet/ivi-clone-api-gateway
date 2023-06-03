import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(1, 30)
  readonly nameRu: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(1, 30)
  readonly nameEn: string;
}
