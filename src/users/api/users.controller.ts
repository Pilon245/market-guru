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
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../infrastucture/users.query.repository';
import {
  CreateUserInputModel,
  UpdateUserInputModel,
} from '../domain/dto/input.dto';
import { CreateUserCommand } from '../application/use-cases/create.user.use.cases';
import { UpdateUserCommand } from '../application/use-cases/update.user.use.cases';
import { DeleteUserCommand } from '../application/use-cases/delete.user.use.cases';
import { pagination, SortDirection } from '../../helper/query.validation';
import {
  CreateUserError,
  GetUsers,
  IResponseUser,
  UpdateUserError,
} from '../domain/dto/swagger';

@ApiTags('Users')
@Controller({
  path: '/users',
})
export class UsersController {
  constructor(
    protected usersQueryRepository: UsersQueryRepository,
    private commandBus: CommandBus,
  ) {}

  @ApiResponse({ status: 200, type: IResponseUser })
  @ApiOperation({ summary: 'Get All Users' })
  @ApiQuery({
    name: 'pageNumber',
    type: String,
    required: false,
    description: 'Параметр номер страницы',
  })
  @ApiQuery({
    name: 'pageSize',
    type: String,
    required: false,
    description: 'Количество элементов на странице',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
    description: 'Поле по которому сортировать',
  })
  @ApiQuery({
    name: 'sortDirection',
    type: String,
    required: false,
    description: 'По возрастанию/убыванию',
    enum: SortDirection,
  })
  @ApiQuery({
    name: 'searchNameTerm',
    type: String,
    required: false,
    description: 'Поиск по имени',
  })
  @ApiQuery({
    name: 'searchPhoneTerm',
    type: String,
    required: false,
    description: 'Поиск по номеру телефона',
  })
  @ApiQuery({
    name: 'searchEmailTerm',
    type: String,
    required: false,
    description: 'Поиск по почте',
  })
  @Get()
  async getUsers(@Query() query) {
    return this.usersQueryRepository.findUsers(pagination(query));
  }

  @ApiResponse({ status: 201, type: GetUsers })
  @ApiResponse({
    status: 400,
    description: 'In Body incorrect data',
    type: CreateUserError,
  })
  @ApiOperation({ summary: 'Create User' })
  @Post()
  @HttpCode(201)
  async createUsers(@Body() inputModel: CreateUserInputModel) {
    const created = await this.commandBus.execute(
      new CreateUserCommand(inputModel),
    );

    return this.usersQueryRepository.findUserById(created.id);
  }

  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, type: UpdateUserError })
  @ApiOperation({ summary: 'Update User' })
  @Put(':id')
  @HttpCode(204)
  async updateUsers(
    @Param('id') id: string,
    @Body() inputModel: UpdateUserInputModel,
  ) {
    const user = await this.usersQueryRepository.findUserById(id);
    if (!user) {
      throw new HttpException('invalid data', 404);
    }
    const command = { id: id, ...inputModel };
    return this.commandBus.execute(new UpdateUserCommand(command));
  }

  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, type: UpdateUserError })
  @ApiOperation({ summary: 'Delete User' })
  @Delete(':id')
  @HttpCode(204)
  async deleteUsers(@Param('id') id: string) {
    const user = await this.usersQueryRepository.findUserById(id);
    if (!user) {
      throw new HttpException('invalid data', 404);
    }
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiOperation({ summary: 'Delete All{testing}' })
  @Delete('/test/all-delete')
  async deleteAllUsers() {
    await this.usersQueryRepository.deleteAll();
    return 'Delete All';
  }
}
