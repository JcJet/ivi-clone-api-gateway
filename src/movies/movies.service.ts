import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@Inject('TO_MOVIES_MS') private api_to_movies: ClientProxy) {}

  async getMovies(movieFilterDto: MovieFilterDto): Promise<object> {
    console.log('API Gateway - Movies Service - getMovies at', new Date());
    return this.api_to_movies.send<object>(
      { cmd: 'getMovies' },
      movieFilterDto,
    );
  }

  async getMovieById(movieId: number): Promise<object> {
    console.log('API Gateway - Movies Service - getMovieById at', new Date());
    return this.api_to_movies.send<object>({ cmd: 'getMovieById' }, movieId);
  }

  async deleteMovie(movieId: number): Promise<object> {
    console.log('API Gateway - Movies Service - deleteMovie at', new Date());
    return this.api_to_movies.send<object>({ cmd: 'deleteMovie' }, movieId);
  }

  async updateMovie(
    movieId: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<object> {
    console.log('API Gateway - Movies Service - updateMovie at', new Date());
    return this.api_to_movies.send<object>(
      { cmd: 'updateMovie' },
      { movieId, updateMovieDto },
    );
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<object> {
    console.log('API Gateway - Movies Service - createMovie at', new Date());
    return this.api_to_movies.send<object>(
      { cmd: 'createMovie' },
      createMovieDto,
    );
  }
}
