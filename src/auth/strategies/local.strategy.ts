import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LOGIN_USER_NOT_MATCH } from 'src/config/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException(LOGIN_USER_NOT_MATCH);
    return user;
  }
}
