import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5, 30)
  readonly nickName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 30)
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 30)
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(10, 12)
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5, 20)
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  //OAuth provider
  readonly provider: string;

  vkId: number;
}
