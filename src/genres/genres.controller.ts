import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreDto } from './dto/genre.dto';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../decorator/roles.guard';

@ApiTags('Genres MS API')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Create genre.',
    description: 'Create genre with JSON. Names must be unique!',
  })
  @ApiOkResponse({ type: GenreDto, description: 'Genre created.' })
  @ApiBadRequestResponse({
    description: 'If body data can not be handled of genre already exists.',
  })
  createGenre(
    @Body() createGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Controller - createGenre at', new Date());

    return this.genresService.createGenre(createGenreDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all genres.',
    description: 'Returns list of all genres without any filtering.',
  })
  @ApiOkResponse({
    isArray: true,
    type: GenreDto,
    description: 'Returns list of all genres.',
  })
  getAllGenres(): Promise<Observable<GenreDto[]>> {
    console.log(
      'API Gateway - Genres Controller - getAllGenres at',
      new Date(),
    );

    return this.genresService.getAllGenres();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get genre by its ID.',
    description: 'Returns genre object if exists.',
  })
  @ApiOkResponse({ type: GenreDto, description: 'Returns genre object.' })
  @ApiNotFoundResponse({ description: 'If genre not exists. Change ID.' })
  getGenre(@Param('id') genreId: number): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Controller - getGenre at', new Date());

    return this.genresService.getGenre(genreId);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Delete genre by its ID.',
    description: 'Delete if only exists.',
  })
  @ApiNoContentResponse({ description: 'Genre deleted.' })
  @ApiNotFoundResponse({ description: 'If genre not exists. Change ID.' })
  deleteGenre(@Param('id') genreId: number): Promise<Observable<object>> {
    console.log('API Gateway - Genres Controller - deleteGenre at', new Date());

    return this.genresService.deleteGenre(genreId);
  }

  @Put('/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Update genre by its ID with JSON body.',
  })
  @ApiOkResponse({ type: GenreDto, description: 'Genre updated.' })
  @ApiNotFoundResponse({ description: 'If genre not exists. Change ID.' })
  @ApiBadRequestResponse({ description: 'If body data can not be handled.' })
  updateGenre(
    @Param('id') genreId: number,
    @Body() updateGenreDto: CreateGenreDto,
  ): Promise<Observable<GenreDto>> {
    console.log('API Gateway - Genres Controller - updateGenre at', new Date());

    return this.genresService.updateGenre(genreId, updateGenreDto);
  }
}
