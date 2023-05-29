import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GetPersonDto } from './dto/get-person.dto';

@Controller('persons')
@ApiTags('Persons MS API')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Create person.',
    description:
      'Create person with JSON. All fields can be duplicated from person to person.',
  })
  @ApiCreatedResponse({ type: CreatePersonDto })
  createPerson(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<Observable<CreatePersonDto>> {
    console.log(
      'API Gateway - Persons Controller - createPerson at',
      new Date(),
    );
    return this.personsService.createPerson(createPersonDto);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Update person.',
    description:
      'Important: all fields in JSON, that have values, (changed or not) must be sent.',
  })
  @ApiNoContentResponse({ description: 'Updated successfully.' })
  @ApiNotFoundResponse({ description: 'Not found, change person ID.' })
  updatePerson(
    @Param('id') personId: number,
    @Body() updatePersonDto: CreatePersonDto,
  ): Promise<Observable<CreatePersonDto>> {
    console.log(
      'API Gateway - Persons Controller - updatePerson at',
      new Date(),
    );
    return this.personsService.updatePerson(personId, updatePersonDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Delete person by its ID.' })
  @ApiOkResponse({ description: 'Deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Not found, change person ID.' })
  deletePerson(@Param('id') personId: number): Promise<Observable<object>> {
    console.log(
      'API Gateway - Persons Controller - deletePerson at',
      new Date(),
    );
    return this.personsService.deletePerson(personId);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get person by its ID.',
    description: 'Returns person info and filmography.',
  })
  @ApiOkResponse({ description: 'Success.', type: GetPersonDto })
  @ApiNotFoundResponse({ description: 'Not found, change person ID.' })
  getPersonById(
    @Param('id') personId: number,
  ): Promise<Observable<GetPersonDto>> {
    console.log(
      'API Gateway - Persons Controller - getPersonById at',
      new Date(),
    );
    return this.personsService.getPersonById(personId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all(?) persons.' })
  @ApiExcludeEndpoint()
  getPersons() {
    console.log('API Gateway - Persons Controller - getPersons at', new Date());
    return this.personsService.getPersons();
  }

  @Get('name/search')
  @ApiOperation({
    summary: 'Find person by name.',
    description: 'Letter case not affect.',
  })
  @ApiQuery({
    name: 'personName',
    type: 'string',
    required: true,
    description: 'Partial name of person.',
  })
  async findPersonByName(@Query() dto: { personName: string }) {
    console.log(
      'API Gateway - Persons Controller - findPersonByName at',
      new Date(),
    );
    console.log(dto);
    return this.personsService.findPersonByName(dto.personName);
  }
}
