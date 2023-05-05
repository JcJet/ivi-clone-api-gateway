import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('persons')
@ApiTags('Persons MS API')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Create person.' })
  createPerson(@Body() createPersonDto: CreatePersonDto) {
    console.log(
      'API Gateway - Persons Controller - createPerson at',
      new Date(),
    );
    return this.personsService.createPerson(createPersonDto);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Update person.' })
  updatePerson(
    @Param('id') personId: number,
    @Body() updatePersonDto: CreatePersonDto,
  ) {
    console.log(
      'API Gateway - Persons Controller - updatePerson at',
      new Date(),
    );
    return this.personsService.updatePerson(personId, updatePersonDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Delete person.' })
  deletePerson(@Param('id') personId: number) {
    console.log(
      'API Gateway - Persons Controller - deletePerson at',
      new Date(),
    );
    return this.personsService.deletePerson(personId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get person by its ID.' })
  getPersonById(@Param('id') personId: number) {
    console.log(
      'API Gateway - Persons Controller - getPersonById at',
      new Date(),
    );
    return this.personsService.getPersonById(personId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all(?) persons.' })
  getPersons() {
    console.log('API Gateway - Persons Controller - getPersons at', new Date());
    return this.personsService.getPersons();
  }
}
