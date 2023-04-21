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

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /*
  MOVIES MICROSERVICE SECTION
  */
  @Get('movies')
  getMovies(@Query() movieFilterDto: MovieFilterDto): object {
    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('movies/:id')
  getMovieById(@Param('id') movieId: number): object {
    return this.moviesService.getMovieById(movieId);
  }

  @Delete('movies/:id')
  @Roles('admin')
  deleteMovie(@Param('id') movieId: number): object {
    return this.moviesService.deleteMovie(movieId);
  }

  @Put('movies')
  @Roles('admin')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @Post('movies')
  @Roles('admin')
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    return this.moviesService.createMovie(createMovieDto);
  }
}
