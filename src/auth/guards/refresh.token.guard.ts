import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGenerate } from '../helper/generate.token';
import { UsersQueryRepository } from '../../users/infrastucture/users.query.repository';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private usersQueryRepository: UsersQueryRepository,
    private jwtGenerate: JwtGenerate,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const refToken = req.cookies.refreshToken;
    if (!refToken) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtGenerate.verifyRefreshTokens(refToken);
    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;
    return true;
  }
}
