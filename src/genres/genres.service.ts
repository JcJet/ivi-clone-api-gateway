import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class GenresService {
  constructor(@Inject('TO_GENRES_MS') private toGenresProxy: ClientProxy) {}

  async createGenre(createGenreDto: CreateGenreDto): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - createGenre at', new Date());
    const genre = await this.toGenresProxy.send(
      { cmd: 'createGenre' },
      { createGenreDto: createGenreDto },
    );
    return genre;
  }

  async getAllGenres(): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - getAllGenres at', new Date());
    const genres = await this.toGenresProxy.send({ cmd: 'getAllGenres' }, {});
    return genres;
  }

  async getGenre(genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - getGenre at', new Date());
    const genre = await this.toGenresProxy.send(
      { cmd: 'getGenreById' },
      { genreId: genreId },
    );
    return genre;
  }

  async deleteGenre(genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - deleteGenre at', new Date());
    const result = await this.toGenresProxy.send(
      { cmd: 'deleteGenre' },
      { genreId: genreId },
    );
    return result;
  }

  async updateGenre(
    genreId: number,
    updateGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Service - updateGenre at', new Date());
    const result = await this.toGenresProxy.send(
      { cmd: 'updateGenre' },
      { genreId: genreId, updateGenreDto: updateGenreDto },
    );
    return result;
  }
}
