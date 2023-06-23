import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
// import { pagination } from '../../validation/query.validation';

import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

// @UseGuards(BasicAdminGuard)
@ApiTags('/users')
@Controller({
  path: '/users',
  scope: Scope.DEFAULT,
})
export class UsersController {
  constructor(
    protected usersQueryRepository: UsersOrmQueryRepository,
    private commandBus: CommandBus,
  ) {}

  @Get()
  async getUsers(@Query() query) {
    return this.usersQueryRepository.findUsers(pagination(query));
  }

  @Post()
  async createUsers(@Body() inputModel: CreateUserInputModel) {
    const created = await this.commandBus.execute(
      new CreateUserCommand(inputModel),
    );
    if (!created) {
      throw new HttpException('invalid blog', 404);
    }
    return this.usersQueryRepository.findUsersById(created.id);
  }

  @Put(':id/ban')
  @HttpCode(204)
  async updateUsers(
    @Param('id') id: string,
    @Body() inputModel: BanUserInputModel,
  ) {
    const banUser: BanAdminUserUseCaseDto = {
      id: id,
      isBanned: inputModel.isBanned,
      banReason: inputModel.banReason,
    };
    return this.commandBus.execute(new BanAdminUserCommand(banUser));
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUsers(@Param('id') id: string) {
    //todo добавить isDeleted
    const result = await this.commandBus.execute(new DeleteUserCommand(id));
    if (!result) {
      throw new HttpException('Incorect Not Found', 404);
    }
    return result;
  }
}
