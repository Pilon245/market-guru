import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './api/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtGenerate } from './helper/generate.token';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: new ConfigService().get<string>('ACCESS_JWT_SECRET'),
      signOptions: { expiresIn: '7m' },
    }),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtGenerate,
    RefreshTokenGuard,
  ],
  exports: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtGenerate,
    RefreshTokenGuard,
  ],
})
export class AuthModule {}
