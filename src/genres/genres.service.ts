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
}
