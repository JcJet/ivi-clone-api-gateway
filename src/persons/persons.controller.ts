import { Body, Controller, Param, Post, Put } from '@nestjs/common';
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
}
