import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
