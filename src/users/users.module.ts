import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersQueryRepository } from './infrastucture/users.query.repository';
import { UsersRepository } from './infrastucture/users.repository';
import { User } from './domain/entities/users.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../service/database.module';
import { CreateUserUseCase } from './application/use-cases/create.user.use.cases';
import { UpdateUserUseCase } from './application/use-cases/update.user.use.cases';
import { DeleteUserUseCase } from './application/use-cases/delete.user.use.cases';
import { NameExistsRule } from './application/name.validation.service';
import { PhoneExistsRule } from './application/phone.validation.service';
import { EmailExistsRule } from './application/email.validation.service';

const useCases = [CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase];
const validate = [NameExistsRule, PhoneExistsRule, EmailExistsRule];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...useCases,
    ...validate,
    UsersQueryRepository,
    UsersRepository,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
  ],
  exports: [UsersQueryRepository, UsersRepository],
})
export class UsersModule {}
