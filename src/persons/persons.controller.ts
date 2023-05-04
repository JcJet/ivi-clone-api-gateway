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

@Controller('persons')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Post()
  createPerson(@Body() createPersonDto: CreatePersonDto) {
    console.log(
      'API Gateway - Persons Controller - createPerson at',
      new Date(),
    );
    return this.personsService.createPerson(createPersonDto);
  }

  @Put('/:id')
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
  deletePerson(@Param('id') personId: number) {
    console.log(
      'API Gateway - Persons Controller - deletePerson at',
      new Date(),
    );
    return this.personsService.deletePerson(personId);
  }

  @Get('/:id')
  getPersonById(@Param('id') personId: number) {
    console.log(
      'API Gateway - Persons Controller - getPersonById at',
      new Date(),
    );
    return this.personsService.getPersonById(personId);
  }

  @Get()
  getPersons() {
    console.log('API Gateway - Persons Controller - getPersons at', new Date());
    return this.personsService.getPersons();
  }
}
