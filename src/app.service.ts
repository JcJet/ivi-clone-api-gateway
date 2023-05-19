import { Injectable } from '@nestjs/common';
import { GenresService } from './genres/genres.service';
import { lastValueFrom } from 'rxjs';
import * as fsPromises from 'fs/promises';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class AppService {
  constructor(
    private genresService: GenresService,
    private movieService: MoviesService,
  ) {}

  async loadDatabases() {
    //Loading genres into Genres MS database
    const genresFile = await fsPromises.readFile('./static/genres.json');
    const genres = JSON.parse(genresFile.toString());

    for (const genre of genres) {
      await lastValueFrom(await this.genresService.createGenre(genre));
    }

    console.log('Genres loaded!');

    //Loading movies with genres into Movies MS & Genres MS databases
    const dir = './static/movies';
    const movieFiles = await fsPromises.readdir(dir);

    const allGenresFromMs: object[] = await lastValueFrom(
      await this.genresService.getAllGenres(),
    );

    for (const movieFile of movieFiles) {
      try {
        const movieData = await fsPromises.readFile(`${dir}/${movieFile}`);
        const parsedMovieData = JSON.parse(movieData.toString());

        if (parsedMovieData.type != 'movie') {
          continue;
        }

        //Creating movie object
        const newMovie = {
          nameRu: parsedMovieData.names[0].name,
          nameEn: parsedMovieData.names[1].name,
          description: parsedMovieData.description,
          trailer: parsedMovieData.videos.trailers[0].url,
          similarMovies: [],
          year: parsedMovieData.year,
          rating: parsedMovieData.rating.imdb,
          ratingCount: parsedMovieData.votes.imdb,
          ageRating: parsedMovieData.ageRating,
          poster: parsedMovieData.poster.url,
          duration: parsedMovieData.movieLength,
          slogan: parsedMovieData.slogan,
          genres: [],
          country: [1, 2],
        };

        const rightGenres = [
          'боевик',
          'триллер',
          'криминал',
          'комедия',
          'семейный',
          'драма',
          'мелодрама',
          'военный',
          'детектив',
          'спорт',
          'история',
          'фэнтези',
          'фантастика',
          'документальный',
          'ужасы',
          'биография',
          'аниме',
          'мультфильм',
          'новости',
          'приключения',
          'короткометражка',
          'мюзикл',
          'детский',
          'музыка',
          'вестерн',
          'концерт',
          'реальное ТВ',
          'ток-шоу',
          'для взрослых',
          'фильм-нуар',
          'игра',
          'церемония',
        ];

        //Adding genres ids to movie object
        for (const genre of parsedMovieData.genres) {
          if (rightGenres.includes(genre.name)) {
            const similarGenre: any = allGenresFromMs.find(
              (genreFromMs: any) =>
                genreFromMs.nameRu.toLowerCase() == genre.name,
            );
            if (similarGenre) {
              newMovie.genres.push(similarGenre.id);
            }
          }
        }

        await lastValueFrom(await this.movieService.createMovie(newMovie));
        console.log('+1');
      } catch (e) {
        console.log(e);
      }
    }
  }
}
