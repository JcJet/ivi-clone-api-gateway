import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenresService {
  constructor(@Inject('ToGenresMs') private toGenresProxy: ClientProxy) {}

  async createGenre(
    createGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Service - createGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'createGenre' },
      { createGenreDto: createGenreDto },
    );
  }

  async getAllGenres(): Promise<Observable<GenreDto[]>> {
    console.log('API Gateway - Genres Service - getAllGenres at', new Date());
    return this.toGenresProxy.send({ cmd: 'getAllGenres' }, {});
  }

  async getGenre(genreId: number): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Service - getGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'getGenreById' },
      { genreId: genreId },
    );
  }

  async deleteGenre(genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - deleteGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'deleteGenre' },
      { genreId: genreId },
    );
  }

  async updateGenre(
    genreId: number,
    updateGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - updateGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'updateGenre' },
      { genreId: genreId, updateGenreDto: updateGenreDto },
    );
  }

  async getHeaderStaticLinks() {
    console.log(
      'API Gateway - Genres Service - getHeaderStaticLinks at',
      new Date(),
    );
    return this.toGenresProxy.send({ cmd: 'getHeaderStaticLinks' }, {});
  }
}
