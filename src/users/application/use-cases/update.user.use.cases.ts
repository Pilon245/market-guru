import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import {
  CreateUserUseCaseDto,
  UsersFactory,
} from '../../domain/dto/users.factory';
import { UsersRepository } from '../../infrastucture/users.repository';
import { _generatePasswordForDb } from '../../../helper/auth.function';

export class CreateUserCommand {
  constructor(public createUseCase: CreateUserUseCaseDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand) {
    const passwordHash = await _generatePasswordForDb(
      command.createUseCase.password,
    );
    const newUser = new UsersFactory(
      randomUUID(),
      command.createUseCase.name,
      command.createUseCase.email,
      command.createUseCase.phone,
      passwordHash,
      new Date().toISOString(),
    );
    await this.usersRepository.createUsers(newUser);
    return newUser;
  }
}
