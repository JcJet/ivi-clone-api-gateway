import { ApiProperty } from '@nestjs/swagger';

export class DeleteMovieResponseDto {
  @ApiProperty()
  readonly result: object;

  @ApiProperty()
  readonly errors: string[];
}
