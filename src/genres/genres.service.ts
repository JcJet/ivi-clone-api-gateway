import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GenresService {
  constructor(@Inject('TO_GENRES_MS') private toGenresProxy: ClientProxy) {
    //for ES-lint not to annoy me
  }

  async createGenre(createGenreDto: CreateGenreDto) {
    return this.toGenresProxy.send({ cmd: 'createGenre' }, createGenreDto);
  }

  async getAllGenres() {
    return this.toGenresProxy.send({ cmd: 'getAllGenres' }, {});
  }

  async getGenre(genreId: number) {
    return this.toGenresProxy.send({ cmd: 'getGenre' }, genreId);
  }

  async deleteGenre(genreId: number) {
    return this.toGenresProxy.send({ cmd: 'deleteGenre' }, genreId);
  }

  async updateGenre(genreId: number, updateGenreDto: CreateGenreDto) {
    return this.toGenresProxy.send(
      { cmd: 'updateGenre' },
      { genreId: genreId, genreData: updateGenreDto },
    );
  }
}
