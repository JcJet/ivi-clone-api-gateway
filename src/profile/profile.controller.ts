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
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { Express, Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile/authentication MS API')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Create/register user.' })
  registration(@Body() registrationDto: RegistrationDto) {
    console.log(
      'API Gateway - Profile Controller - registration at',
      new Date(),
    );
    return this.profileService.registration(registrationDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login endpoint.' })
  login(@Body() loginDto: LoginDto) {
    console.log('API Gateway - Profile Controller - login at', new Date());
    return this.profileService.login(loginDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete profile by its ID.' })
  deleteProfile(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - deleteProfile at',
      new Date(),
    );
    return this.profileService.deleteProfile(profileId);
  }

  @Put('/:id')
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile by its ID.' })
  getProfileById(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - getProfileById at',
      new Date(),
    );
    return this.profileService.getProfileById(profileId);
  }

  @Post('/refreshAccessToken')
  @ApiBearerAuth()
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
