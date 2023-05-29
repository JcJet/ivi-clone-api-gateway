import { Injectable } from '@nestjs/common';
import { GenresService } from './genres/genres.service';
import { lastValueFrom } from 'rxjs';
import * as fsPromises from 'fs/promises';
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
          if (professions.includes(person.enProfession)) {
            const personFromDatabase = await lastValueFrom(
              await this.personsService.findPersonByName(person.name),
            );
            if (personFromDatabase.length == 0) {
              await lastValueFrom(
                await this.personsService.createPerson({
                  nameRu: person.name,
                  nameEn: person.enName,
                  photo: person.photo,
                }),
              );
            }
          }
        }

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
          actors: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'actor';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
          director: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'director';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
          producer: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'producer';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
          operator: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'operator';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
          editor: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'editor';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
          composer: await Promise.all(
            parsedMovieData.persons
              .filter((person) => {
                return person.enProfession == 'composer';
              })
              .map(async (object) => await this.getPersonId(object)),
          ),
        };
        console.log(newMovie);
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
    return { status: 200, response: 'All done!' };
  }

  private async getPersonId(personObject: { name: string }) {
    const persons = await lastValueFrom(
      await this.personsService.findPersonByName(personObject.name),
    );
    console.log(persons, persons[0].personId);
    return persons[0].personId;
  }
}
