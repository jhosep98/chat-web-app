import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators';
import { UserEntity } from 'src/users/entity/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return user;
  }

  @Get('profile')
  profile() {
    return 'estos son tus datos';
  }
}
