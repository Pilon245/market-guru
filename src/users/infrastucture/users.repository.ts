import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '../domain/entities/users.entity';
import { UpdateUsersFactory, UsersFactory } from '../domain/dto/users.factory';
import { Op } from 'sequelize';

@Injectable({ scope: Scope.DEFAULT })
export class UsersRepository {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findUserLogin(login: string) {
    return this.usersRepository.findOne({
      where: {
        [Op.or]: [{ name: login }, { email: login }, { phone: login }],
      },
      attributes: ['id', 'name', 'email', 'phone', 'passwordHash'],
      raw: true,
    });
  }

  async createUsers(dto: UsersFactory) {
    return this.usersRepository.create({
      ...dto,
    });
  }

  async updateUsers(id: string, dto: UpdateUsersFactory) {
    const user = await this.usersRepository.findByPk(id);
    await user.update(dto);
    return;
  }

  async deleteUsers(id: string) {
    const user = await this.usersRepository.findByPk(id);
    await user.destroy();
    return;
  }
}
