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

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Post()
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Get()
  getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @Get('/:id')
  getGenre(@Param('id') genreId: number) {
    return this.genresService.getGenre(genreId);
  }

  @Delete('/:id')
  deleteGenre(@Param('id') genreId: number) {
    return this.genresService.deleteGenre(genreId);
  }

  @Put('/:id')
  updateGenre(
    @Param('id') genreId: number,
    @Body() updateGenreDto: CreateGenreDto,
  ) {
    console.log('API Gateway - Genres Controller - updateGenre');
    return this.genresService.updateGenre(genreId, updateGenreDto);
  }
}
