import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get role data by its ID.' })
  @ApiOkResponse({
    description: 'May returns empty result (if role not exists).',
    type: RoleDto,
  })
  getRoleById(@Param('id') id: number) {
    console.log('API Gateway - Roles Controller - getRoleById at', new Date());

    return this.rolesService.getRoleById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles data.' })
  @ApiOkResponse({
    description: 'May returns empty result (if roles not exists).',
    type: RoleDto,
    isArray: true,
  })
  getAllRoles() {
    console.log('API Gateway - Roles Controller - getAllRoles at', new Date());

    return this.rolesService.getAllRoles();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Updates role data by its ID.' })
  @ApiOkResponse({
    description: 'Role updated.',
  })
  @ApiNotFoundResponse({ description: 'Role by given ID not exists.' })
  updateRole(@Param('id') id: number, @Body() dto: RoleDto) {
    console.log('API Gateway - Roles Controller - updateRole at', new Date());

    return this.rolesService.updateRole(id, dto);
  }

  @Delete('/:value')
  @ApiOperation({ summary: 'Deletes role by its name.' })
  @ApiParam({ description: 'Role name.', name: 'value' })
  @ApiOkResponse({
    description: 'Role deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Role by given value (name) not exists.',
  })
  deleteRoleByValue(@Param('value') value: string) {
    console.log(
      'API Gateway - Roles Controller - deleteRoleByValue at',
      new Date(),
    );

    return this.rolesService.deleteRoleByValue(value);
  }

  @Put('/user/:userId')
  @ApiOperation({
    summary: 'Add roles to user.',
    description:
      'Add roles by their value (name). If role not exists, creates it.',
  })
  @ApiBody({ description: 'Roles names array.', type: 'string', isArray: true })
  addUserRoles(
    @Param('userId') userId: number,
    @Body() dto: { roles: string[] },
  ) {
    console.log('API Gateway - Roles Controller - addUserRoles at', new Date());

    return this.rolesService.addUserRoles(userId, dto);
  }
}
