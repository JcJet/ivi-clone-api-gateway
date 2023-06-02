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
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';

@Controller('roles')
@ApiTags('Roles MS API')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new role.' })
  @ApiBadRequestResponse({ description: 'Role already exists.' })
  @ApiOkResponse({ description: 'Role created.' })
  createRole(@Body() dto: RoleDto) {
    console.log('API Gateway - Roles Controller - createRole at', new Date());

    return this.rolesService.createRole(dto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Returns user roles by user ID.',
  })
  getUserRoles(@Param('userId') userId: number) {
    console.log('API Gateway - Roles Controller - getUserRoles at', new Date());

    return this.rolesService.getUserRoles(userId);
  }

  @Delete('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user roles by user ID.',
  })
  deleteUserRoles(@Param('userId') userId: number) {
    console.log(
      'API Gateway - Roles Controller - deleteUserRoles at',
      new Date(),
    );

    return this.rolesService.deleteUserRoles(userId);
  }
}
