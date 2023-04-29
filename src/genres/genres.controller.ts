import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Observable } from 'rxjs';

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Post()
  createGenre(
    @Body() createGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - createGenre at', new Date());
    return this.genresService.createGenre(createGenreDto);
  }

  @Get()
  getAllGenres(): Promise<Observable<any>> {
    console.log(
      'API Gateway - Genres Controller - getAllGenres at',
      new Date(),
    );
    return this.genresService.getAllGenres();
  }

  @Get('/:id')
  getGenre(@Param('id') genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - getGenre at', new Date());
    return this.genresService.getGenre(genreId);
  }

  @Delete('/:id')
  deleteGenre(@Param('id') genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - deleteGenre at', new Date());
    return this.genresService.deleteGenre(genreId);
  }

  @Put('/:id')
  updateGenre(
    @Param('id') genreId: number,
    @Body() updateGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - updateGenre at', new Date());
    return this.genresService.updateGenre(genreId, updateGenreDto);
  }
}
