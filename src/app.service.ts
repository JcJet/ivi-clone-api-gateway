import { Injectable } from '@nestjs/common';
import { GenresService } from './genres/genres.service';
import { lastValueFrom } from 'rxjs';
import * as fsPromises from 'fs/promises';
import { MoviesService } from './movies/movies.service';
import { countriesList } from '../static/countries';

@Injectable()
export class AppService {
  constructor(
    private genresService: GenresService,
    private movieService: MoviesService,
  ) {}

  async loadDatabases() {
    //Loading countries
    console.log('Loading countries...');
    try {
      await lastValueFrom(await this.movieService.fillCountries());
    } catch (e) {
      console.log(e);
    }
    console.log('Countries loaded!');

    //Loading genres into Genres MS database
    console.log('Loading genres...');
    const genresFile = await fsPromises.readFile('./static/genres.json');
    const genres = JSON.parse(genresFile.toString());

    for (const genre of genres) {
      try {
        await lastValueFrom(await this.genresService.createGenre(genre));
      } catch (e) {
        console.log(e);
      }
    }

    console.log('Genres loaded!');

    //Loading movies with genres and countries into Movies MS & Genres MS databases
    console.log('Loading movies...');
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

        const countries = parsedMovieData.countries.map(
          (country) =>
            countriesList.find(
              (countryObj) => countryObj.nameRu == country.name,
            ).shortName,
        );

        //Creating movie object
        const similarMovies = (Math.random() * 100).toFixed(0);

        const newMovie = {
          nameRu: parsedMovieData.names[0].name,
          nameEn: parsedMovieData.names[1].name,
          description: parsedMovieData.description,
          trailer: parsedMovieData.videos.trailers[0].url,
          similarMovies: [similarMovies],
          year: parsedMovieData.year,
          rating: parsedMovieData.rating.imdb,
          ratingCount: parsedMovieData.votes.imdb,
          ageRating: parsedMovieData.ageRating,
          poster: parsedMovieData.poster.url,
          duration: parsedMovieData.movieLength,
          slogan: parsedMovieData.slogan,
          genres: [],
          countries: countries,
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
      } catch (e) {
        console.log(e);
      }
    }
    console.log('Movies loaded!');
  }
}
