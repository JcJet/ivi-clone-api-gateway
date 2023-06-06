import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';
import { RolesGuard } from '../decorator/roles.guard';
import { Roles } from '../decorator/roles.decorator';

@Controller('roles')
@ApiTags('Roles MS API')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Create new role.' })
  @ApiConflictResponse({ description: 'Role already exists.' })
  createRole(@Body() dto: RoleDto) {
    console.log('API Gateway - Roles Controller - createRole at', new Date());

    return this.rolesService.createRole(dto);
  }

  @Get('/:id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Get role data by its ID.' })
  @ApiOkResponse({
    description: 'Role by ID',
    type: RoleDto,
  })
  @ApiNotFoundResponse({ description: 'Role by given ID not exists.' })
  getRoleById(@Param('id') id: number) {
    console.log('API Gateway - Roles Controller - getRoleById at', new Date());

    return this.rolesService.getRoleById(id);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Get all roles data.' })
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
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Updates role data by its ID.' })
  @ApiOkResponse({
    description: 'Role updated.',
  })
  @ApiConflictResponse({ description: 'Role with that value already exists.' })
  @ApiNotFoundResponse({ description: 'Role by given ID not exists.' })
  updateRole(@Param('id') id: number, @Body() dto: RoleDto) {
    console.log('API Gateway - Roles Controller - updateRole at', new Date());

    return this.rolesService.updateRole(id, dto);
  }

  @Delete('/:value')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN-ONLY Deletes role by its name.' })
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
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Add roles to user.',
    description:
      'Add roles by their value (name). If role not exists, creates it.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBody({ description: 'Roles names array.', type: 'string', isArray: true })
  addUserRoles(@Param('userId') userId: number, @Body() roles: string[]) {
    console.log('API Gateway - Roles Controller - addUserRoles at', new Date());

    return this.rolesService.addUserRoles({ userId, roles });
  }

  @Get('/user/:userId')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'ADMIN-ONLY Returns user roles by user ID.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  getUserRoles(@Param('userId') userId: number) {
    console.log('API Gateway - Roles Controller - getUserRoles at', new Date());

    return this.rolesService.getUserRoles(userId);
  }

  @Delete('/user/:userId')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'ADMIN-ONLY Revoke user roles by user ID and array of role values.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBody({ description: 'Roles names array.', type: 'string', isArray: true })
  revokeUserRoles(@Param('userId') userId: number, @Body() roles: string[]) {
    console.log(
      'API Gateway - Roles Controller - deleteUserRoles at',
      new Date(),
    );

    return this.rolesService.revokeUserRoles({ userId, roles });
  }
}
