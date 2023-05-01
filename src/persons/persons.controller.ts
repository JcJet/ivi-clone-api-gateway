import { Body, Controller, Post } from '@nestjs/common';
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
}
