import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: 'Role name.', required: true })
  readonly value: string;

  @ApiProperty({ description: 'Role description.', required: false })
  readonly description: string;
}
