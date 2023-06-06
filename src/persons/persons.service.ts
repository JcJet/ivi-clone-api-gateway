import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { CreatePersonDto } from './dto/create-person.dto';
import { GetPersonDto } from './dto/get-person.dto';

@Injectable()
export class PersonsService {
  constructor(@Inject('ToPersonsMs') private personsRmqProxy: ClientProxy) {}

  async createPerson(
    createPersonDto: CreatePersonDto,
  ): Promise<Observable<CreatePersonDto>> {
    console.log('API Gateway - Persons Service - createPerson at', new Date());

    return this.personsRmqProxy
      .send({ cmd: 'createPerson' }, { createPersonDto: createPersonDto })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async updatePerson(personId: number, updatePersonDto: CreatePersonDto) {
    console.log('API Gateway - Persons Service - updatePerson at', new Date());

    return this.personsRmqProxy
      .send(
        { cmd: 'updatePerson' },
        { personId: personId, updatePersonDto: updatePersonDto },
      )
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async deletePerson(personId: number): Promise<Observable<object>> {
    console.log('API Gateway - Persons Service - deletePerson at', new Date());

    return this.personsRmqProxy
      .send({ cmd: 'deletePerson' }, { personId: personId })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async getPersonById(personId: number): Promise<Observable<GetPersonDto>> {
    console.log('API Gateway - Persons Service - getPersonById at', new Date());

    return this.personsRmqProxy
      .send({ cmd: 'getPersonById' }, { personId: personId })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async getPersons(): Promise<Observable<object>> {
    console.log('API Gateway - Persons Service - getPersons at', new Date());

    return this.personsRmqProxy
      .send({ cmd: 'getPersons' }, {})
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async findPersonByName(dto: {
    personName: string;
    position: string;
  }): Promise<Observable<object>> {
    console.log(
      'API Gateway - Persons Service - findPersonByName at',
      new Date(),
    );

    return this.personsRmqProxy
      .send({ cmd: 'findPersonByName' }, { ...dto })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }

  async findPersonByNameService(dto): Promise<Observable<any>> {
    console.log(
      'API Gateway - Persons Service - findPersonByNameService at',
      new Date(),
    );
    return this.personsRmqProxy
      .send({ cmd: 'findPersonByNameService' }, { dto })
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
  }
}
