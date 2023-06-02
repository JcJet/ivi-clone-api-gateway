import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Express, Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';

@Controller('profile')
@ApiTags('Profile/authentication MS API')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Create/register user.' })
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(
      'API Gateway - Profile Controller - registration at',
      new Date(),
    );
    return this.profileService.registration(registrationDto, res);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login endpoint.' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    console.log('API Gateway - Profile Controller - login at', new Date());

    return this.profileService.login(loginDto, res);
  }

  @Delete('/:id') //admin or master
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete profile by its ID.' })
  deleteProfile(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - deleteProfile at',
      new Date(),
    );
    return this.profileService.deleteProfile(profileId);
  }

  @Put('/:id') //admin or master
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile by its ID.' })
  updateProfile(
    @Param('id') profileId: number,
    @Body() updateProfileDto: RegistrationDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log(
      'API Gateway - Profile Controller - updateProfile at',
      new Date(),
    );
    return this.profileService.updateProfile(
      profileId,
      updateProfileDto,
      avatar,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all profiles.' })
  getAllProfiles() {
    console.log(
      'API Gateway - Profile Controller - getAllProfiles at',
      new Date(),
    );
    return this.profileService.getAllProfiles();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile by its ID.' })
  getProfileById(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - getProfileById at',
      new Date(),
    );
    return this.profileService.getProfileById(profileId);
  }

  @Post('/refreshAccessToken') //???
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update/refresh access token.' })
  refreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(
      'API Gateway - Profile Controller - updateAccessToken at',
      new Date(),
    );
    return this.profileService.refreshAccessToken(request, response);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user.' })
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('API Gateway - Profile Controller - logout at', new Date());
    return this.profileService.logout(request, response);
  }

  @Get('/activate/:link')
  @ApiOperation({ summary: 'Activate new account.' })
  activateAccount(
    @Param('link') activationLink: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(
      'API Gateway - Profile Controller - activateAccount at',
      new Date(),
    );
    return this.profileService.activateAccount(activationLink, response);
  }
}
