import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('ToRolesMs') private rolesRmqProxy: ClientProxy) {}

  async createRole(dto: RoleDto) {
    console.log('API Gateway - Roles Service - createRole at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'createRole' }, { dto: dto });
  }

  async getRoleById(id: number) {
    console.log('API Gateway - Roles Service - getRoleById at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'getRoleById' }, { id: id });
  }
}
