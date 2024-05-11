import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/common/env.config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: ENV.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        };
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
