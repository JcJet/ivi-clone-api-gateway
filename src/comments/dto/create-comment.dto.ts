import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  readonly authorId: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly essenceTable: string;

  @ApiProperty()
  readonly essenceId: number;
}
