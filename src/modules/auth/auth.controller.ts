import {
  Controller,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { validateDTO } from 'src/common/utils';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginData: unknown) {
    const errors = await validateDTO(loginData, Auth);

    if (errors.length)
      // Intentional not descriptive error message
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );

    const { email, password } = loginData as Auth;

    return this.authService.login(email, password);
  }
}
