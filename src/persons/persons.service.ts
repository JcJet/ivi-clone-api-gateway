import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetPersonDto } from './dto/get-person.dto';

@Injectable()
export class PersonsService {
  constructor(@Inject('ToPersonsMs') private personsRmqProxy: ClientProxy) {}

  async createPerson(
    createPersonDto: CreatePersonDto,
  ): Promise<Observable<CreatePersonDto>> {
    console.log('API Gateway - Persons Service - createPerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'createPerson' },
      { createPersonDto: createPersonDto },
    );
  }

  async updatePerson(personId: number, updatePersonDto: CreatePersonDto) {
    console.log('API Gateway - Persons Service - updatePerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'updatePerson' },
      { personId: personId, updatePersonDto: updatePersonDto },
    );
  }

  async deletePerson(personId: number): Promise<Observable<object>> {
    console.log('API Gateway - Persons Service - deletePerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'deletePerson' },
      { personId: personId },
    );
  }

  async getPersonById(personId: number): Promise<Observable<GetPersonDto>> {
    console.log('API Gateway - Persons Service - getPersonById at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'getPersonById' },
      { personId: personId },
    );
  }

  async getPersons() {
    console.log('API Gateway - Persons Service - getPersons at', new Date());
    return this.personsRmqProxy.send({ cmd: 'getPersons' }, {});
  }

  async addPersonsToMovie(data) {
    console.log(
      'API Gateway - Persons Service - addPersonsToMovie at',
      new Date(),
    );
    return this.personsRmqProxy.send({ cmd: 'addPersonsToMovie' }, { ...data });
  }

  async findPersonByName(dto) {
    console.log(
      'API Gateway - Persons Service - findPersonByName at',
      new Date(),
    );
    return this.personsRmqProxy.send({ cmd: 'findPersonByName' }, { ...dto });
  }

  async findPersonByNameService(dto) {
    console.log(
      'API Gateway - Persons Service - findPersonByNameService at',
      new Date(),
    );
    return this.personsRmqProxy.send(
      { cmd: 'findPersonByNameService' },
      { dto },
    );
  }
}
