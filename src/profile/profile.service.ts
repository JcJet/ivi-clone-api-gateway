import { Inject, Injectable, Param, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { Request, Response } from 'express';

import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('ToProfilesMs') private profileProxy: ClientProxy,
    @Inject('ToFilesMs') private filesProxy: ClientProxy,
    private configService: ConfigService,
  ) {}

  async registration(
    registrationDto: RegistrationDto,
    response: Response,
  ): Promise<any> {
    console.log('API Gateway - Profile Service - registration at', new Date());

    const profileData = await lastValueFrom(
      this.profileProxy.send({ cmd: 'registration' }, { registrationDto }),
    );
    this.checkForError(profileData);

    response.cookie('refreshToken', profileData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return profileData;
  }

  async login(loginDto: LoginDto, response: Response): Promise<any> {
    console.log('API Gateway - Profile Service - login at', new Date());

    const profileData = await lastValueFrom(
      this.profileProxy.send({ cmd: 'login' }, { loginDto }),
    );
    this.checkForError(profileData);

    response.cookie('refreshToken', profileData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return profileData;
  }

  async deleteProfile(
    @Param('id') profileId: number,
  ): Promise<Observable<any>> {
    console.log('API Gateway - Profile Service - deleteProfile at', new Date());
    return this.profileProxy.send(
      { cmd: 'deleteProfile' },
      { profileId: profileId },
    );
  }

  async updateProfile(
    profileId: number,
    updateProfileDto: RegistrationDto,
  ): Promise<any> {
    console.log('API Gateway - Profile Service - updateProfile at', new Date());

    const updateProfileResult = await lastValueFrom(
      this.profileProxy.send(
        { cmd: 'updateProfile' },
        {
          profileId: profileId,
          updateProfileDto: updateProfileDto,
        },
      ),
    );
    this.checkForError(updateProfileResult);

    return updateProfileResult;
  }

  async getAllProfiles(): Promise<Observable<any>> {
    console.log(
      'API Gateway - Profile Service - getAllProfiles at',
      new Date(),
    );

    return this.profileProxy.send({ cmd: 'getAllProfiles' }, {});
  }

  async getProfileById(profileId: number): Promise<any> {
    console.log(
      'API Gateway - Profile Service - getProfileById at',
      new Date(),
    );

    const profileData = await lastValueFrom(
      this.profileProxy.send(
        { cmd: 'getProfileById' },
        { profileId: profileId },
      ),
    );
    this.checkForError(profileData);

    return profileData;
  }

  async refreshAccessToken(request: Request, response: Response): Promise<any> {
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

    this.checkForError(profileData);

    response.cookie('refreshToken', profileData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return profileData;
  }

  async logout(request: Request, response: Response): Promise<any> {
    console.log('API Gateway - Profile Service - logout at', new Date());

    const { refreshToken } = request.cookies;
    const profileData = await lastValueFrom(
      this.profileProxy.send({ cmd: 'logout' }, { refreshToken: refreshToken }),
    );
    response.clearCookie('refreshToken');

    return profileData;
  }

  async activateAccount(
    activationLink: string,
    response: Response,
  ): Promise<any> {
    console.log(
      'API Gateway - Profile Service - activateAccount at',
      new Date(),
    );

    const activationResult = await lastValueFrom(
      this.profileProxy.send(
        { cmd: 'activateAccount' },
        { activationLink: activationLink },
      ),
    );
    this.checkForError(activationResult);

    return response.redirect(this.configService.get('CLIENT_URL'));
  }

  async googleLogin(req, res): Promise<any> {
    console.log('API Gateway - Profile Service - googleLogin at', new Date());

    if (!req.user) {
      return 'No user from google';
    }
    const registrationDto: RegistrationDto = {
      email: req.user.email,
      nickName: req.user.email.split('@')[0],
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      password: req.user.accessToken,
      provider: 'google',
      phone: '',
      vkId: null,
    };
    try {
      return await this.registration(registrationDto, res);
    } catch (e) {
      console.log(e);
      if (e.status == 409) {
        return await this.login(registrationDto, res);
      } else throw e;
    }
  }

  async loginVk(code: string): Promise<any> {
    console.log('API Gateway - Profile Service - loginVk at', new Date());

    return this.profileProxy.send({ cmd: 'loginVk' }, { code });
  }

  private checkForError(obj) {
    console.log('API Gateway - Profile Service - checkForError at', new Date());

    const exception = obj.exception;
    if (exception) {
      throw new HttpException(exception.message, exception.statusCode);
    }
  }
}
