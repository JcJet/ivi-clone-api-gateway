import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenresService {
  constructor(@Inject('ToGenresMs') private toGenresProxy: ClientProxy) {}

  async createGenre(
    createGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Service - createGenre at', new Date());

    return this.toGenresProxy
      .send({ cmd: 'createGenre' }, { createGenreDto: createGenreDto })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async getAllGenres(): Promise<Observable<GenreDto[]>> {
    console.log('API Gateway - Genres Service - getAllGenres at', new Date());

    return this.toGenresProxy
      .send({ cmd: 'getAllGenres' }, {})
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async getGenre(genreId: number): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Service - getGenre at', new Date());

    return this.toGenresProxy
      .send({ cmd: 'getGenreById' }, { genreId: genreId })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async deleteGenre(genreId: number): Promise<Observable<object>> {
    console.log('API Gateway - Genres Service - deleteGenre at', new Date());

    return this.toGenresProxy
      .send({ cmd: 'deleteGenre' }, { genreId: genreId })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async updateGenre(
    genreId: number,
    updateGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Service - updateGenre at', new Date());

    return this.toGenresProxy
      .send(
        { cmd: 'updateGenre' },
        { genreId: genreId, updateGenreDto: updateGenreDto },
      )
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async getHeaderStaticLinks(): Promise<Observable<object>> {
    console.log(
      'API Gateway - Genres Service - getHeaderStaticLinks at',
      new Date(),
    );

    return this.toGenresProxy
      .send({ cmd: 'getHeaderStaticLinks' }, {})
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }
}
