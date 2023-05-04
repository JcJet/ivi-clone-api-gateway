import { Inject, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';

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
}
