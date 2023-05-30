import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GenresService } from './genres/genres.service';

@Controller()
@ApiTags('Main application (SERVICE USE ONLY)')
export class AppController {
  constructor(
    private appService: AppService,
    private genresService: GenresService,
  ) {}

  @Get('/loadDatabases')
  @ApiOperation({
    summary: 'Load countries, genres & movies data into empty databases.',
    description:
      'Should be executed every time, when databases are empty - first start, cleaning DBs (deleting Docker containers) etc.',
  })
  @ApiOkResponse({ description: 'All done!' })
  loadDatabase() {
    return this.appService.loadDatabases();
  }

  @Get('/navigation')
  @ApiOperation({
    summary: 'Returns header links.',
    description:
      'Returns dynamic header links object, that depends on existing genres.',
  })
  @ApiOkResponse({ description: 'All fine!' })
  getHeaderStaticLinks(): Promise<Observable<object>> {
    return this.genresService.getHeaderStaticLinks();
  }
}
