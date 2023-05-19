import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Main application (SERVICE USE ONLY)')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/loadDatabases')
  @ApiOperation({ summary: 'Load all movie data into databases.' })
  loadDatabase() {
    return this.appService.loadDatabases();
  }
}
