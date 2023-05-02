import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { AuthorizationService } from './authorization.service';
import { LoginDto } from './dto/login.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post()
  registration(@Body() registrationDto: RegistrationDto) {
    console.log(
      'API Gateway - Authorization Controller - registration at',
      new Date(),
    );
    return this.authorizationService.registration(registrationDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log(
      'API Gateway - Authorization Controller - login at',
      new Date(),
    );
    return this.authorizationService.login(loginDto);
  }
}
