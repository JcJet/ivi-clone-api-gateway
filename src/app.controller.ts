import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Main application (SERVICE USE ONLY)')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/loadDatabase')
  @ApiOperation({ summary: 'Load all movie data into DBs.' })
  loadDatabase() {
    return this.appService.loadDatabase();
  }
}
