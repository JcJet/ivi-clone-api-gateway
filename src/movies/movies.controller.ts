import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { MoviesService } from './movies.service';
import { Roles } from '../decorator/roles.decorator';
import { CreateMovieDto } from './dto/movie/create-movie.dto';
import { MovieFilterDto } from './dto/movie/movie-filter.dto';
import { MoviesResponseDto } from './dto/movie/movies-response.dto';
import { MovieResponseDto } from './dto/movie/movie-response.dto';
import { DeleteMovieResponseDto } from './dto/movie/delete-movie-response.dto';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';
import { RolesGuard } from '../decorator/roles.guard';

@ApiTags('Movies MS API')
@Controller()
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/movies/')
  @ApiExcludeEndpoint()
  getMovies(
    @Query()
    movieFilterDto: MovieFilterDto,
  ): Promise<Observable<MoviesResponseDto>> {
    console.log('API Gateway - Movies Controller - getMovies at', new Date());

    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('movies/:genres')
  @ApiOperation({
    summary: 'Get list of movies with genres filter.',
    description:
      'May be filtered with genres. To filter without genres other get method should be used.',
  })
  @ApiParam({
    name: 'genres',
    example: 'drama+comedy',
    description:
      'Genres should be passed as parameter in following format:' +
      ' "url/movies/genres/drama+tv-show". Genres written in kebab-lower-case, separated by "+".',
    required: false,
  })
  @ApiOkResponse({
    isArray: true,
    type: MoviesResponseDto,
  })
  getMoviesWithGenres(
    @Query() movieFilterDto: MovieFilterDto,
    @Param('genres') genres: string,
  ): Promise<Observable<MoviesResponseDto>> {
    console.log('API Gateway - Movies Controller - getMovies at', new Date());
    movieFilterDto.genres = genres;

    return this.moviesService.getMovies(movieFilterDto);
  }

  @Get('/movie/:id')
  @ApiOperation({
    summary: 'Get movie by its ID.',
    description: 'Returns full movie entity.',
  })
  @ApiOkResponse({
    type: MovieResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '123',
    description: 'Just an ID of requested movie.',
  })
  getMovieById(
    @Param('id') movieId: number,
  ): Promise<Observable<MovieResponseDto>> {
    console.log(
      'API Gateway - Movies Controller - getMovieById at',
      new Date(),
    );

    return this.moviesService.getMovieById(movieId);
  }

  @Delete('/movie/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Delete movie by its ID.' })
  @ApiParam({
    name: 'id',
    required: true,
    example: '123',
    description: 'Just an ID of requested movie.',
  })
  @ApiOkResponse({
    type: DeleteMovieResponseDto,
  })
  deleteMovie(
    @Param('id') movieId: number,
  ): Promise<Observable<DeleteMovieResponseDto>> {
    console.log('API Gateway - Movies Controller - deleteMovie at', new Date());

    return this.moviesService.deleteMovie(movieId);
  }

  @Put('/movie/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Update movie by its ID with JSON body.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '123',
    description: 'Just an ID of requested movie.',
  })
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: CreateMovieDto,
  ): Promise<Observable<DeleteMovieResponseDto>> {
    console.log('API Gateway - Movies Controller - updateMovie at', new Date());

    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @Post('/movie/')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Create movie with JSON body.',
  })
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    console.log('API Gateway - Movies Controller - createMovie at', new Date());

    return this.moviesService.createMovie(createMovieDto);
  }
}
