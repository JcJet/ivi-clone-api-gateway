export class UpdateMovieDto {
  readonly nameRu: string;
  readonly nameEn: string;
  readonly description: string;
  readonly country: string | string[];
  readonly director: string;
  readonly actors: string[];
  readonly produced: string;
  readonly cinematographer: string;
  readonly screenwriter: string;
  readonly composer: string | string[];
  readonly genres: string | string[];
  readonly trailer: string;
  readonly similarMovies: number[];
  readonly startYear: number;
  readonly endYear: number;
  readonly rating: number;
  readonly ratingCount: number;
  readonly imageUrl: string; //  нужна только маленькая картинка, в API кинопоиска posterUrlPreview
  // readonly reviews: IviReview[]; TODO
  readonly reviewCount: number;
  readonly duration: string; // в минутах, либо в строке оставить "113 минут"
}
