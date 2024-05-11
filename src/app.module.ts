import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
