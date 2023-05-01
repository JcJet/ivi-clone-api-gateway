import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PersonsService {
  constructor(@Inject('ToPersonsMs') private personsRmqProxy: ClientProxy) {}

  async createPerson(createPersonDto: CreatePersonDto) {
    console.log('API Gateway - Persons Service - createPerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'createPerson' },
      { ...createPersonDto },
    );
  }

  async updatePerson(personId: number, updatePersonDto: CreatePersonDto) {
    return this.personsRmqProxy.send(
      { cmd: 'updatePerson' },
      { personId: personId, ...updatePersonDto },
    );
  }
}
