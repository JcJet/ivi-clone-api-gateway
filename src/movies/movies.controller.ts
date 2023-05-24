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
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { Observable } from 'rxjs';
import { MoviesResponseDto } from './dto/movies-response.dto';

@ApiTags('Movies MS API')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of movies.',
    description:
      'May be filtered only without genres filter. To filter with genres use "/movies/genres/:genres" endpoint.',
  })
  @ApiOkResponse({
    isArray: true,
    type: MoviesResponseDto,
  })
  getMovies(
    @Query() movieFilterDto: MovieFilterDto,
  ): Promise<Observable<MoviesResponseDto>> {
    console.log('API Gateway - Movies Controller - getMovies at', new Date());
    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('genres/:genres')
  @ApiOperation({
    summary: 'Get list of movies, may be filtered with genres filter.',
  })
  getMoviesWithGenres(
    @Query() movieFilterDto: any,
    @Param('genres') genres: string,
  ): object {
    console.log('API Gateway - Movies Controller - getMovies at', new Date());
    movieFilterDto.genres = genres;
    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get movie by its ID.' })
  getMovieById(@Param('id') movieId: number): object {
    console.log(
      'API Gateway - Movies Controller - getMovieById at',
      new Date(),
    );
    return this.moviesService.getMovieById(movieId);
  }

  @Delete('/:id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Delete movie by its ID.' })
  deleteMovie(@Param('id') movieId: number): object {
    console.log('API Gateway - Movies Controller - deleteMovie at', new Date());
    return this.moviesService.deleteMovie(movieId);
  }

  @Put('/:id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Update movie by its ID with JSON body.',
  })
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    console.log('API Gateway - Movies Controller - updateMovie at', new Date());
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Create movie by its ID with JSON body.',
  })
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    console.log('API Gateway - Movies Controller - createMovie at', new Date());
    return this.moviesService.createMovie(createMovieDto);
  }
}
