import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail({ email });
    console.log(user);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
