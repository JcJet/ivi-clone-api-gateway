import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../decorator/jwt-auth.guard';
import { MasterOrAdminGuard } from '../decorator/master-or-admin.guard';
import {UpdateProfileDto} from "./dto/update-profile.dto";

@Controller()
@ApiTags('Profile/authentication MS API')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Create/register user.' })
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - registration at',
      new Date(),
    );

    return this.profileService.registration(registrationDto, res);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login endpoint.' })
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log('API Gateway - Profile Controller - login at', new Date());

    return this.profileService.login(loginDto, res);
  }

  @Delete('/profile/:id')
  @UseGuards(JwtAuthGuard, MasterOrAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete profile by its ID.' })
  deleteProfile(@Param('id') profileId: number): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - deleteProfile at',
      new Date(),
    );

    return this.profileService.deleteProfile(profileId);
  }

  @Put('/profile/:id') //admin or master
  @UseGuards(JwtAuthGuard, MasterOrAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile by its ID.' })
  updateProfile(
    @Param('id') profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - updateProfile at',
      new Date(),
    );

    return this.profileService.updateProfile(profileId, updateProfileDto);
  }

  @Get('/profiles')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all profiles.' })
  getAllProfiles(): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - getAllProfiles at',
      new Date(),
    );

    return this.profileService.getAllProfiles();
  }

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile by its ID.' })
  getProfileById(@Param('id') profileId: number): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - getProfileById at',
      new Date(),
    );

    return this.profileService.getProfileById(profileId);
  }

  @Post('/refreshAccessToken')
  @ApiOperation({ summary: 'Update/refresh access token.' })
  refreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
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
  ): Promise<any> {
    console.log('API Gateway - Profile Controller - logout at', new Date());

    return this.profileService.logout(request, response);
  }

  @Get('/activate/:link')
  @ApiOperation({ summary: 'Activate new account.' })
  activateAccount(
    @Param('link') activationLink: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - activateAccount at',
      new Date(),
    );

    return this.profileService.activateAccount(activationLink, response);
  }

  @Get('/oauth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<any> {
    console.log('API Gateway - Profile Controller - googleAuth at', new Date());
  }

  @ApiExcludeEndpoint()
  @Get('/oauth/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log(
      'API Gateway - Profile Controller - googleAuthRedirect at',
      new Date(),
    );

    return this.profileService.googleLogin(req, res);
  }

  @Get('/oauth/vk')
  async vkAuth(@Req() req, @Res() res): Promise<any> {
    console.log('API Gateway - Profile Controller - vkAuth at', new Date());

    const redirectUri = process.env.API_URL + '/oauth/vk_redirect/';
    const link = `https://oauth.vk.com/authorize?client_id=${process.env.VK_APP_ID}&redirect_uri=${redirectUri}&scope=email&response_type=code`;
    res.redirect(link);
  }

  @ApiExcludeEndpoint()
  @Get('/oauth/vk_redirect/')
  vkRedirect(
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<any> {
    console.log('API Gateway - Profile Controller - vkRedirect at', new Date());

    return this.profileService.loginVk(code);
  }
}
