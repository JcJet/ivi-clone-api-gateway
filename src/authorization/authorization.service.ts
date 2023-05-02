import { Inject, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject('ToAuthorizationMs') private authorizationProxy: ClientProxy,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    console.log(
      'API Gateway - Authorization Service - registration at',
      new Date(),
    );
    return this.authorizationProxy.send(
      { cmd: 'registration' },
      { ...registrationDto },
    );
  }

  async login(loginDto: LoginDto) {
    console.log('API Gateway - Authorization Service - login at', new Date());
    return this.authorizationProxy.send({ cmd: 'login' }, { ...loginDto });
  }
}
