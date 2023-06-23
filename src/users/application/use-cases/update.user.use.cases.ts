import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  UpdateUsersFactory,
  UpdateUserUseCaseDto,
} from '../../domain/dto/users.factory';
import { UsersRepository } from '../../infrastucture/users.repository';

export class UpdateUserCommand {
  constructor(public updateUseCase: UpdateUserUseCaseDto) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler<UpdateUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand) {
    const updateUser = new UpdateUsersFactory(
      command.updateUseCase.name,
      command.updateUseCase.email,
      command.updateUseCase.phone,
    );
    await this.usersRepository.updateUsers(
      command.updateUseCase.id,
      updateUser,
    );
    return;
  }
}
