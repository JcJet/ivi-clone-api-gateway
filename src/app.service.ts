import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';

import { GenresService } from './genres/genres.service';
import { lastValueFrom } from 'rxjs';
import { MoviesService } from './movies/movies.service';
import { countriesList } from '../static/countries';
import { PersonsService } from './persons/persons.service';

@Injectable()
export class AppService {
  constructor(
    private genresService: GenresService,
    private movieService: MoviesService,
    private personsService: PersonsService,
  ) {}

  async loadDatabases(): Promise<object> {
    const createdPersons: number[] = [];
    const createdMovies: number[] = [];

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

        if (createdMovies.includes(parsedMovieData.id)) continue;
        createdMovies.push(parsedMovieData.id);

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
          actors: [],
          director: [],
          producer: [],
          operator: [],
          editor: [],
          composer: [],
        };

        //Persons section
        for (const person of parsedMovieData.persons) {
          const professions = [
            'actor',
            'producer',
            'director',
            'operator',
            'editor',
            'composer',
          ];
          if (
            professions.includes(person.enProfession) &&
            person.name &&
            person.enName
          ) {
            const insertedId = { id: null };
            if (!createdPersons.includes(person.id)) {
              const newPerson = await lastValueFrom(
                await this.personsService.createPerson({
                  nameRu: person.name,
                  nameEn: person.enName,
                  photo: person.photo,
                }),
              );
              insertedId.id = newPerson.personId;
              createdPersons.push(person.id);
            } else {
              const personFromDatabase = await lastValueFrom(
                await this.personsService.findPersonByNameService(person.name),
              );
              insertedId.id = personFromDatabase.personId;
            }
            switch (person.enProfession) {
              case 'actor':
                newMovie.actors.push(insertedId.id);
                break;
              case 'producer':
                newMovie.producer.push(insertedId.id);
                break;
              case 'director':
                newMovie.director.push(insertedId.id);
                break;
              case 'operator':
                newMovie.operator.push(insertedId.id);
                break;
              case 'editor':
                newMovie.editor.push(insertedId.id);
                break;
              case 'composer':
                newMovie.composer.push(insertedId.id);
                break;
            }
          }
        }

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

        if (
          newMovie.composer.length > 0 &&
          newMovie.actors.length > 0 &&
          newMovie.producer.length > 0 &&
          newMovie.director.length > 0 &&
          newMovie.operator.length > 0 &&
          newMovie.editor.length > 0
        ) {
          console.log('+1 Movie');
          await lastValueFrom(await this.movieService.createMovie(newMovie));
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log('Movies loaded!');

    return { status: 200, response: 'All done!' };
  }
}
