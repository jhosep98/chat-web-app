import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorators';
import { UserEntity } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity, @Res() res: Response) {
    const data = await this.authService.login(user);
    res.status(HttpStatus.OK).json({
      message: 'Successful login',
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  profile() {
    return 'Message list....';
  }
}
