import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@Inject('ToMoviesMs') private moviesRmqProxy: ClientProxy) {}

  async getMovies(movieFilterDto: MovieFilterDto): Promise<object> {
    console.log('API Gateway - Movies Service - getMovies at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'getMovies' },
      { movieFilterDto: movieFilterDto },
    );
  }

  async getMovieById(movieId: number): Promise<object> {
    console.log('API Gateway - Movies Service - getMovieById at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'getMovieById' },
      { movieId: movieId },
    );
  }

  async deleteMovie(movieId: number): Promise<object> {
    console.log('API Gateway - Movies Service - deleteMovie at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'deleteMovie' },
      { movieId: movieId },
    );
  }

  async updateMovie(
    movieId: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<object> {
    console.log('API Gateway - Movies Service - updateMovie at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'updateMovie' },
      { movieId: movieId, updateMovieDto: updateMovieDto },
    );
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<object> {
    console.log('API Gateway - Movies Service - createMovie at', new Date());
    return this.moviesRmqProxy.send<object>(
      { cmd: 'createMovie' },
      { createMovieDto: createMovieDto },
    );
  }
}
