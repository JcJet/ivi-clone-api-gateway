import { Body, Inject, Injectable, Param, Req, Res } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class ProfileService {
  constructor(@Inject('ToProfileMs') private profileProxy: ClientProxy) {}

  async registration(registrationDto: RegistrationDto) {
    console.log('API Gateway - Profile Service - registration at', new Date());
    return this.profileProxy.send(
      { cmd: 'registration' },
      { ...registrationDto },
    );
  }

  async login(loginDto: LoginDto) {
    console.log('API Gateway - Profile Service - login at', new Date());
    return this.profileProxy.send({ cmd: 'login' }, { ...loginDto });
  }

  async deleteProfile(@Param('id') profileId: number) {
    console.log('API Gateway - Profile Service - deleteProfile at', new Date());
    return this.profileProxy.send(
      { cmd: 'deleteProfile' },
      { profileId: profileId },
    );
  }

  async updateProfile(profileId: number, updateProfileDto: RegistrationDto) {
    console.log('API Gateway - Profile Service - updateProfile at', new Date());
    return this.profileProxy.send(
      { cmd: 'updateProfile' },
      {
        profileId: profileId,
        updateProfileDto: updateProfileDto,
      },
    );
  }

  async getAllProfiles() {
    console.log(
      'API Gateway - Profile Service - getAllProfiles at',
      new Date(),
    );
    return this.profileProxy.send({ cmd: 'getAllProfiles' }, {});
  }

  async getProfileById(profileId: number) {
    console.log(
      'API Gateway - Profile Service - getProfileById at',
      new Date(),
    );
    return this.profileProxy.send(
      { cmd: 'getProfileById' },
      { profileId: profileId },
    );
  }

  async updateAccessToken(request: Request, response: Response) {
    console.log(
      'API Gateway - Profile Service - updateAccessToken at',
      new Date(),
    );
    const { refreshToken } = request.cookies;
    const profileData = await lastValueFrom(
      this.profileProxy.send(
        { cmd: 'updateAccessToken' },
        { refreshToken: refreshToken },
      ),
    );
    response.cookie('refreshToken', profileData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return profileData;
  }

  async logout(request: Request, response: Response) {
    console.log('API Gateway - Profile Service - logout at', new Date());
    const { refreshToken } = request.cookies;
    const profileData = await lastValueFrom(
      this.profileProxy.send({ cmd: 'logout' }, { refreshToken: refreshToken }),
    );
    response.clearCookie('refreshToken');
    return profileData;
  }
}
