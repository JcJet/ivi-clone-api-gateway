import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  registration(@Body() registrationDto: RegistrationDto) {
    console.log(
      'API Gateway - Profile Controller - registration at',
      new Date(),
    );
    return this.profileService.registration(registrationDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log('API Gateway - Profile Controller - login at', new Date());
    return this.profileService.login(loginDto);
  }

  @Delete('/:id')
  deleteProfile(@Param('id') profileId: number) {
    console.log(
      'API Gateway - Profile Controller - deleteProfile at',
      new Date(),
    );
    return this.profileService.deleteProfile(profileId);
  }

  @Put('/:id')
  updateProfile(
    @Param('id') profileId: number,
    @Body() updateProfileDto: RegistrationDto,
  ) {
    console.log(
      'API Gateway - Profile Controller - updateProfile at',
      new Date(),
    );
    return this.profileService.updateProfile(profileId, updateProfileDto);
  }
}
