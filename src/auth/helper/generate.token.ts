import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGenerate {
  private accessTokenJwtSecret =
    this.configService.get<string>('ACCESS_JWT_SECRET');
  private refreshTokenJwtSecret =
    this.configService.get<string>('REFRESH_JWT_SECRET');

  constructor(private configService: ConfigService) {}

  async generateTokens(userId: string) {
    const accessToken = jwt.sign({ id: userId }, this.accessTokenJwtSecret, {
      expiresIn: '10m',
    });
    const refreshToken = jwt.sign({ id: userId }, this.refreshTokenJwtSecret, {
      expiresIn: '60m',
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async verifyRefreshTokens(token: string) {
    try {
      const result: any = jwt.verify(token, this.refreshTokenJwtSecret);
      return result;
    } catch (error) {
      return null;
    }
  }
}
