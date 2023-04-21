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
import { AppService } from './app.service';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { Roles } from './decorator/roles.decorator';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  MOVIES MICROSERVICE SECTION
  */
  @Get('movies')
  getMovies(@Query() movieFilterDto: MovieFilterDto): object {
    return this.appService.getMovies(movieFilterDto);
  }

  @Get('movies/:id')
  getMovieById(@Param('id') movieId: number): object {
    return this.appService.getMovieById(movieId);
  }

  @Delete('movies/:id')
  @Roles('admin')
  deleteMovie(@Param('id') movieId: number): object {
    return this.appService.deleteMovie(movieId);
  }

  @Put('movies')
  @Roles('admin')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.appService.updateMovie(movieId, updateMovieDto);
  }

  @Post('movies')
  @Roles('admin')
  createMovie(@Body() createMovieDto: CreateMovieDto): object {
    return this.appService.createMovie(createMovieDto);
  }

  /*
  GENRE MICROSERVICE SECTION
  */

  /*
  PERSON MICROSERVICE SECTION
  */

  /*
  GENRE MICROSERVICE SECTION
  */

  /*
  COMMENTARIES MICROSERVICE SECTION
  */

  /*
  ROLES MICROSERVICE SECTION
  */

  /*
  PROFILE MICROSERVICE SECTION
  */

  /*
  USER MICROSERVICE SECTION
  */
}
