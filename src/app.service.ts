import { Injectable } from '@nestjs/common';
import { GenresModule } from './genres/genres.module';
import * as fs from 'fs';
import { GenresService } from './genres/genres.service';
import {lastValueFrom} from "rxjs";
@Injectable()
export class AppService {
  constructor(private genresService: GenresService) {}

  async loadDatabase() {
    //Loading genres into DB
    const genresFile = fs.readFileSync('genres.json');
    const genres = JSON.parse(genresFile.toString());

    for (const genre of genres) {
      await lastValueFrom(await this.genresService.createGenre(genre));
    }

    return 'Genres loaded!';
  }
}
