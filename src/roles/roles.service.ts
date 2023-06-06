import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

import { RoleDto } from './dto/role.dto';
import { AddUserRoleDto } from './dto/addUserRole.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('ToRolesMs') private rolesRmqProxy: ClientProxy) {}

  async createRole(dto: RoleDto) {
    console.log('API Gateway - Roles Service - createRole at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'createRole' }, { dto: dto }),
    );
  }

  async getRoleById(id: number) {
    console.log('API Gateway - Roles Service - getRoleById at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'getRoleById' }, { id: id }),
    );
  }

  async getAllRoles() {
    console.log('API Gateway - Roles Service - getAllRoles at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'getAllRoles' }, {}),
    );
  }

  async updateRole(id: number, dto: RoleDto) {
    console.log('API Gateway - Roles Service - updateRole at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'updateRole' }, { id, dto }),
    );
  }

  async deleteRoleByValue(value: string) {
    console.log(
      'API Gateway - Roles Service - deleteRoleByValue at',
      new Date(),
    );

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'deleteRoleByValue' }, { value }),
    );
  }

  async addUserRoles(dto: AddUserRoleDto) {
    console.log('API Gateway - Roles Service - addUserRoles at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'addUserRoles' }, { dto }),
    );
  }

  async getUserRoles(userId: number) {
    console.log('API Gateway - Roles Service - getUserRoles at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'getUserRoles' }, { userId }),
    );
  }

  revokeUserRoles(dto: AddUserRoleDto) {
    console.log('API Gateway - Roles Service - deleteUserRoles at', new Date());

    return this.checkForError(
      this.rolesRmqProxy.send({ cmd: 'deleteUserRoles' }, { dto }),
    );
  }

  private async checkForError(obj: Observable<any>) {
    console.log(
      'API Gateway - Roles Controller - checkForError at',
      new Date(),
    );

    const rmqResponse = await lastValueFrom(obj);
    const exception = rmqResponse?.exception;
    if (exception) {
      throw new HttpException(exception.message, exception.statusCode);
    }
    return rmqResponse;
  }
}
