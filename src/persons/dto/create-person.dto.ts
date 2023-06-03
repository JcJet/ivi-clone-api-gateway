import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePersonDto {
  personId?: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(1, 50)
  nameRu: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(1, 50)
  nameEn: string;

  @ApiProperty({ description: 'URL to photo image', required: false })
  @IsUrl()
  @IsOptional()
  photo?: string;

  @ApiProperty({ required: false })
  @Length(10, 200)
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @Length(10, 2000)
  @IsString()
  @IsOptional()
  biography?: string;
}
