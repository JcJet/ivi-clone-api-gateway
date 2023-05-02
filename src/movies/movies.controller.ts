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
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Getting list of movies, may be filtered.' })
  getMovies(@Query() movieFilterDto: MovieFilterDto): object {
    console.log('API Gateway - Movies Controller - getMovies at', new Date());
    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('/:id')
  getMovieById(@Param('id') movieId: number): object {
    console.log(
      'API Gateway - Movies Controller - getMovieById at',
      new Date(),
    );
    return this.moviesService.getMovieById(movieId);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @Roles('admin')
  deleteMovie(@Param('id') movieId: number): object {
    console.log('API Gateway - Movies Controller - deleteMovie at', new Date());
    return this.moviesService.deleteMovie(movieId);
  }

  @ApiBearerAuth()
  @Put('/:id')
  @Roles('admin')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    console.log('API Gateway - Movies Controller - updateMovie at', new Date());
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @ApiBearerAuth()
  @Post('')
  @Roles('admin')
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    console.log('API Gateway - Movies Controller - createMovie at', new Date());
    return this.moviesService.createMovie(createMovieDto);
  }
}
