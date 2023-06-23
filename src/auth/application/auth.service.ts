import { Injectable, Scope } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../users/infrastucture/users.repository';
import { JwtGenerate } from '../helper/generate.token';

@Injectable({ scope: Scope.DEFAULT })
export class AuthService {
  constructor(
    protected usersRepository: UsersRepository,
    private jwtGenerate: JwtGenerate,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersRepository.findUserLogin(login);
    if (!user) return false;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return false;
    return user;
  }

  async login(userId: string) {
    return this.jwtGenerate.generateTokens(userId);
  }

  async newToken(userId: string) {
    return this.jwtGenerate.generateTokens(userId);
  }
}
