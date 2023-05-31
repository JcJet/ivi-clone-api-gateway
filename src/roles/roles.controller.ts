import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles MS API')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new role.' })
  @ApiBadRequestResponse({ description: 'Role already exists.' })
  @ApiOkResponse({ description: 'Role created.' })
  createRole(@Body() dto: RoleDto) {
    console.log('API Gateway - Roles Controller - createRole at', new Date());

    return this.rolesService.createRole(dto);
  }
}
