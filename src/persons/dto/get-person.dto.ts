import { CreatePersonDto } from './create-person.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MiniMovieDto } from '../../movies/dto/mini-movie.dto';

export class GetPersonDto extends CreatePersonDto {
  @ApiProperty({ isArray: true })
  director: MiniMovieDto;

  @ApiProperty({ isArray: true })
  actor: MiniMovieDto;

  @ApiProperty({ isArray: true })
  producer: MiniMovieDto;

  @ApiProperty({ isArray: true })
  cinematographer: MiniMovieDto;

  @ApiProperty({ isArray: true })
  screenwriter: MiniMovieDto;

  @ApiProperty({ isArray: true })
  composer: MiniMovieDto;
}
