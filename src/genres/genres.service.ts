import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GenreInterface } from './interface/genre.interface';

@Injectable()
export class GenresService {
  constructor(@Inject('TO_GENRES_MS') private toGenresProxy: ClientProxy) {}

  async createGenre(
    createGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreInterface>> {
    console.log('API Gateway - Genres Controller - createGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'createGenre' },
      { createGenreDto: createGenreDto },
    );
  }

  async getAllGenres(): Promise<Observable<any>> {
    console.log(
      'API Gateway - Genres Controller - getAllGenres at',
      new Date(),
    );
    return this.toGenresProxy.send({ cmd: 'getAllGenres' }, {});
  }

  async getGenre(genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - getGenre at', new Date());
    return this.toGenresProxy.send({ cmd: 'getGenre' }, { genreId: genreId });
  }

  async deleteGenre(genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - deleteGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'deleteGenre' },
      { genreId: genreId },
    );
  }

  async updateGenre(
    genreId: number,
    updateGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - updateGenre at', new Date());
    return this.toGenresProxy.send(
      { cmd: 'updateGenre' },
      { genreId: genreId, updateGenreDto: updateGenreDto },
    );
  }
}
