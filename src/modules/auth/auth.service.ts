import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      // Intentional not descriptive error message
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated)
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );

    const payload = {
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
