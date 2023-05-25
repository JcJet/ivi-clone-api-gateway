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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genres MS API')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Create genre.',
    description: 'Create genre with JSON. Names must be unique!',
  })
  createGenre(
    @Body() createGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - createGenre at', new Date());
    return this.genresService.createGenre(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres.' })
  getAllGenres(): Promise<Observable<any>> {
    console.log(
      'API Gateway - Genres Controller - getAllGenres at',
      new Date(),
    );
    return this.genresService.getAllGenres();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get genre by its ID.' })
  getGenre(@Param('id') genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - getGenre at', new Date());
    return this.genresService.getGenre(genreId);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Delete genre by its ID.' })
  deleteGenre(@Param('id') genreId: number): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - deleteGenre at', new Date());
    return this.genresService.deleteGenre(genreId);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Update genre by its ID with JSON body.',
  })
  updateGenre(
    @Param('id') genreId: number,
    @Body() updateGenreDto: CreateGenreDto,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Genres Controller - updateGenre at', new Date());
    return this.genresService.updateGenre(genreId, updateGenreDto);
  }

  @Get('/get/headerStaticLinks')
  @ApiOperation({ summary: 'Returns header links.' })
  getHeaderStaticLinks() {
    return this.genresService.getHeaderStaticLinks();
  }
}
