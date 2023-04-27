import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from '../decorator/roles.decorator';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('movies-api')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Getting list of movies, may be filtered.' })
  getMovies(@Query() movieFilterDto: MovieFilterDto): object {
    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('/:id')
  getMovieById(@Param('id') movieId: number): object {
    return this.moviesService.getMovieById(movieId);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @Roles('admin')
  deleteMovie(@Param('id') movieId: number): object {
    return this.moviesService.deleteMovie(movieId);
  }

  @ApiBearerAuth()
  @Put('')
  @Roles('admin')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @ApiBearerAuth()
  @Post('')
  @Roles('admin')
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    return this.moviesService.createMovie(createMovieDto);
  }
}
