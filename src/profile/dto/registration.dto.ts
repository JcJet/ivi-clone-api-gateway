import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  readonly nickName: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly email: string;

  //OAuth provider
  readonly provider: string;

  vkId: number;
}
