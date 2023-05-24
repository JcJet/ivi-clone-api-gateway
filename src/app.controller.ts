import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Main application (SERVICE USE ONLY)')
export class AppController {
  constructor(private appService: AppService) {}

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
}
