import { Inject, Injectable, Param } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Express, Request, Response } from 'express';
import {FileDto} from "./dto/file.dto";

@Injectable()
export class ProfileService {
  constructor(@Inject('ToProfilesMs') private profileProxy: ClientProxy,
              @Inject('ToFilesMs') private filesProxy: ClientProxy) {}

  async registration(registrationDto: RegistrationDto, response: Response) {
    console.log('API Gateway - Profile Service - registration at', new Date());

    const profileData = await lastValueFrom(
        this.profileProxy.send({ cmd: 'registration' }, { registrationDto }),
    );

    response.cookie('refreshToken', profileData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return profileData;
  }

  async login(loginDto: LoginDto, response: Response) {
    console.log('API Gateway - Profile Service - login at', new Date());

    const profileData = await lastValueFrom(
        this.profileProxy.send({ cmd: 'login' }, { loginDto }),
    );

    response.cookie('refreshToken', profileData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return profileData;
  }

  async deleteProfile(@Param('id') profileId: number) {
    console.log('API Gateway - Profile Service - deleteProfile at', new Date());
    return this.profileProxy.send(
      { cmd: 'deleteProfile' },
      { profileId: profileId },
    );
  }

  async updateProfile(
    profileId: number,
    updateProfileDto: RegistrationDto,
    avatar: Express.Multer.File,
  ) {
    console.log('API Gateway - Profile Service - updateProfile at', new Date());

    let avatarFileName = '';
    if (avatar) {
      const fileDto: FileDto = { essenceTable: 'Profiles', essenceId: profileId };
      await lastValueFrom(
          this.filesProxy.send({ cmd: 'deleteFiles' }, { dto: fileDto }),
      );
      avatarFileName = await lastValueFrom(
          this.filesProxy.send({ cmd: 'createFile' }, { file: avatar, dto: fileDto }),
      );
    }

    return this.profileProxy.send(
      { cmd: 'updateProfile' },
      {
        profileId: profileId,
        updateProfileDto: updateProfileDto,
        avatarFileName: avatarFileName,
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

  async refreshAccessToken(request: Request, response: Response) {
    console.log(
      'API Gateway - Profile Service - updateAccessToken at',
      new Date(),
    );
    const { refreshToken } = request.cookies;
    const profileData = await lastValueFrom(
      this.profileProxy.send(
        { cmd: 'refreshAccessToken' },
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

  async activateAccount(activationLink: string, response: Response) {
    console.log(
      'API Gateway - Profile Service - activateAccount at',
      new Date(),
    );
    await this.profileProxy.send(
      { cmd: 'activateAccount' },
      { activationLink: activationLink },
    );
    return response.redirect('http://localhost:3111');
  }
}
