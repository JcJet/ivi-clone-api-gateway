import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ description: 'Role name.', required: true })
  @IsDefined()
  @IsString()
  readonly value: string;

  @ApiProperty({ description: 'Role description.', required: false })
  @IsOptional()
  @IsString()
  readonly description: string;
}
