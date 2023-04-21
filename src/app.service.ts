import { Inject, Injectable } from '@nestjs/common';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('TO_MOVIES_MS') private api_to_movies: ClientProxy) {}

  /*
  MOVIES MICROSERVICE SECTION
  */
  async getMovies(movieFilterDto: MovieFilterDto): Promise<object> {
    return this.api_to_movies
      .send<object>({ cmd: 'getMovies' }, movieFilterDto)
      .subscribe();
  }

  async getMovieById(movieId: number): Promise<object> {
    return this.api_to_movies
      .send<object>({ cmd: 'getMovieById' }, movieId)
      .subscribe();
  }

  async deleteMovie(movieId: number): Promise<object> {
    return this.api_to_movies
      .send<object>({ cmd: 'deleteMovie' }, movieId)
      .subscribe();
  }

  async updateMovie(
    movieId: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<object> {
    return this.api_to_movies
      .send<object>({ cmd: 'updateMovie' }, { movieId, updateMovieDto })
      .subscribe();
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<object> {
    return this.api_to_movies
      .send<object>({ cmd: 'createMovie' }, createMovieDto)
      .subscribe();
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
